'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TestTube, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useX402Payment, verifyPayment, getUSDCBalance } from '@/lib/payments';
import { useAccount } from 'wagmi';

export function PaymentTest() {
  const [testResults, setTestResults] = useState<{
    walletConnection: boolean | null;
    usdcBalance: string | null;
    paymentFlow: boolean | null;
    transactionHash: string | null;
    verification: boolean | null;
  }>({
    walletConnection: null,
    usdcBalance: null,
    paymentFlow: null,
    transactionHash: null,
    verification: null,
  });

  const [isRunning, setIsRunning] = useState(false);
  const { address, isConnected } = useAccount();
  const { processPayment, isWalletConnected } = useX402Payment();

  const runTests = async () => {
    setIsRunning(true);
    setTestResults({
      walletConnection: null,
      usdcBalance: null,
      paymentFlow: null,
      transactionHash: null,
      verification: null,
    });

    try {
      // Test 1: Wallet Connection
      const walletConnected = isConnected && isWalletConnected;
      setTestResults(prev => ({ ...prev, walletConnection: walletConnected }));
      
      if (!walletConnected) {
        setIsRunning(false);
        return;
      }

      // Test 2: USDC Balance Check
      const balance = await getUSDCBalance(address!);
      setTestResults(prev => ({ ...prev, usdcBalance: balance }));

      // Test 3: Payment Flow (Mock payment for testing)
      try {
        const mockPaymentResult = await processPayment({
          amount: '0.01', // Small test amount
          currency: 'USDC',
          recipient: '0x742d35Cc6634C0532925a3b8D0C9e3e0C0e0e0e0', // Test recipient
          description: 'Test payment for x402 flow verification',
          metadata: { test: true },
        });

        setTestResults(prev => ({ 
          ...prev, 
          paymentFlow: mockPaymentResult.success,
          transactionHash: mockPaymentResult.transactionHash || null,
        }));

        // Test 4: Transaction Verification
        if (mockPaymentResult.success && mockPaymentResult.transactionHash) {
          const verified = await verifyPayment(mockPaymentResult.transactionHash);
          setTestResults(prev => ({ ...prev, verification: verified }));
        }
      } catch (error) {
        console.error('Payment test failed:', error);
        setTestResults(prev => ({ ...prev, paymentFlow: false }));
      }
    } catch (error) {
      console.error('Test suite failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const TestResult = ({ 
    label, 
    result, 
    details 
  }: { 
    label: string; 
    result: boolean | null; 
    details?: string;
  }) => (
    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        {details && <span className="text-xs text-gray-400">{details}</span>}
        {result === null ? (
          <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
        ) : result ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400" />
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl p-6 cyber-border"
    >
      <div className="flex items-center space-x-3 mb-6">
        <TestTube className="w-6 h-6 text-neon-blue" />
        <h3 className="text-xl font-bold neon-text">X402 Payment Flow Test</h3>
      </div>

      <div className="space-y-3 mb-6">
        <TestResult 
          label="Wallet Connection" 
          result={testResults.walletConnection}
          details={isConnected ? address?.slice(0, 6) + '...' + address?.slice(-4) : 'Not connected'}
        />
        
        <TestResult 
          label="USDC Balance Check" 
          result={testResults.usdcBalance !== null}
          details={testResults.usdcBalance ? `${testResults.usdcBalance} USDC` : undefined}
        />
        
        <TestResult 
          label="Payment Processing" 
          result={testResults.paymentFlow}
          details={testResults.transactionHash ? 'Transaction created' : undefined}
        />
        
        <TestResult 
          label="Transaction Verification" 
          result={testResults.verification}
          details={testResults.transactionHash ? testResults.transactionHash.slice(0, 10) + '...' : undefined}
        />
      </div>

      <button
        onClick={runTests}
        disabled={isRunning || !isConnected}
        className="w-full cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
            Running Tests...
          </>
        ) : (
          <>
            <TestTube className="w-4 h-4 inline mr-2" />
            {isConnected ? 'Run X402 Tests' : 'Connect Wallet First'}
          </>
        )}
      </button>

      {testResults.transactionHash && (
        <div className="mt-4 p-3 bg-green-900/20 rounded-lg">
          <p className="text-xs text-green-300 font-semibold mb-1">Test Transaction Hash:</p>
          <p className="text-xs font-mono text-gray-300 break-all">
            {testResults.transactionHash}
          </p>
        </div>
      )}
    </motion.div>
  );
}
