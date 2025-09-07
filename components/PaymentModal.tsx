'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useX402Payment, X402_CONFIG, type PaymentResult } from '@/lib/payments';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (transactionHash: string) => void;
  battleId: string;
  amount?: string;
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  battleId,
  amount = X402_CONFIG.BATTLE_FEE 
}: PaymentModalProps) {
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const { createBattlePayment, isWalletConnected } = useX402Payment();

  const handlePayment = async () => {
    if (!isWalletConnected) {
      setPaymentState('error');
      setPaymentResult({ success: false, error: 'Wallet not connected' });
      return;
    }

    setPaymentState('processing');
    
    try {
      const result = await createBattlePayment(battleId);
      setPaymentResult(result);
      
      if (result.success && result.transactionHash) {
        setPaymentState('success');
        // Wait a moment to show success state, then call success callback
        setTimeout(() => {
          onPaymentSuccess(result.transactionHash!);
          onClose();
        }, 2000);
      } else {
        setPaymentState('error');
      }
    } catch (error) {
      setPaymentState('error');
      setPaymentResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Payment failed' 
      });
    }
  };

  const handleClose = () => {
    if (paymentState !== 'processing') {
      setPaymentState('idle');
      setPaymentResult(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-6 max-w-md w-full cyber-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold neon-text">Battle Entry Fee</h2>
              {paymentState !== 'processing' && (
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Payment Content */}
            <div className="space-y-6">
              {paymentState === 'idle' && (
                <>
                  <div className="text-center space-y-4">
                    <div className="cyber-border rounded-xl p-4 bg-blue-900/20">
                      <CreditCard className="w-12 h-12 text-neon-blue mx-auto mb-2" />
                      <p className="text-lg font-semibold">Pay to Enter Battle</p>
                      <p className="text-gray-300 text-sm mt-2">
                        Battle ID: {battleId}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-lg">
                      <span className="text-gray-300">Amount:</span>
                      <span className="text-xl font-bold text-neon-green">
                        {amount} USDC
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>• Payment will be processed on Base network</p>
                      <p>• USDC will be transferred from your wallet</p>
                      <p>• Transaction will be confirmed on-chain</p>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!isWalletConnected}
                    className="w-full cyber-button text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isWalletConnected ? 'Pay with USDC' : 'Connect Wallet First'}
                  </button>
                </>
              )}

              {paymentState === 'processing' && (
                <div className="text-center space-y-4">
                  <div className="cyber-border rounded-xl p-6 bg-yellow-900/20">
                    <Loader2 className="w-12 h-12 text-neon-yellow mx-auto mb-4 animate-spin" />
                    <p className="text-lg font-semibold">Processing Payment...</p>
                    <p className="text-gray-300 text-sm mt-2">
                      Please confirm the transaction in your wallet
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    <p>⏳ Waiting for transaction confirmation...</p>
                  </div>
                </div>
              )}

              {paymentState === 'success' && paymentResult?.transactionHash && (
                <div className="text-center space-y-4">
                  <div className="cyber-border rounded-xl p-6 bg-green-900/20">
                    <CheckCircle className="w-12 h-12 text-neon-green mx-auto mb-4" />
                    <p className="text-lg font-semibold text-neon-green">Payment Successful!</p>
                    <p className="text-gray-300 text-sm mt-2">
                      Your battle entry has been confirmed
                    </p>
                  </div>
                  
                  <div className="text-xs text-gray-400 break-all">
                    <p>Transaction Hash:</p>
                    <p className="font-mono bg-slate-800/50 p-2 rounded mt-1">
                      {paymentResult.transactionHash}
                    </p>
                  </div>
                </div>
              )}

              {paymentState === 'error' && (
                <div className="text-center space-y-4">
                  <div className="cyber-border rounded-xl p-6 bg-red-900/20">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-red-400">Payment Failed</p>
                    <p className="text-gray-300 text-sm mt-2">
                      {paymentResult?.error || 'An unknown error occurred'}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setPaymentState('idle')}
                    className="w-full cyber-button bg-red-900/20 hover:bg-red-900/30 text-red-300"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
