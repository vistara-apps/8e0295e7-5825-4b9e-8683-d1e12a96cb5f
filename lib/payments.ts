import { useWalletClient } from 'wagmi';
import { parseUnits } from 'viem';

// X402 Payment Configuration
export const X402_CONFIG = {
  // USDC on Base contract address
  USDC_CONTRACT: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  // Battle entry fee in USDC (e.g., 1 USDC)
  BATTLE_FEE: '1',
  // Payment recipient address (should be configured per environment)
  PAYMENT_RECIPIENT: process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT || '0x742d35Cc6634C0532925a3b8D0C9e3e0C0e0e0e0',
};

export interface PaymentRequest {
  amount: string;
  currency: 'USDC';
  recipient: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

/**
 * Hook to handle x402 payments using wagmi wallet client
 */
export function useX402Payment() {
  const { data: walletClient } = useWalletClient();

  const processPayment = async (request: PaymentRequest): Promise<PaymentResult> => {
    try {
      if (!walletClient) {
        throw new Error('Wallet not connected');
      }

      // Convert amount to proper units (USDC has 6 decimals)
      const amount = parseUnits(request.amount, 6);

      // USDC transfer function signature
      const transferData = {
        address: X402_CONFIG.USDC_CONTRACT as `0x${string}`,
        abi: [
          {
            name: 'transfer',
            type: 'function',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'amount', type: 'uint256' }
            ],
            outputs: [{ name: '', type: 'bool' }],
            stateMutability: 'nonpayable'
          }
        ],
        functionName: 'transfer',
        args: [request.recipient as `0x${string}`, amount],
      };

      // Execute the transaction
      const hash = await walletClient.writeContract(transferData);

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Payment failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown payment error',
      };
    }
  };

  const createBattlePayment = async (battleId: string): Promise<PaymentResult> => {
    return processPayment({
      amount: X402_CONFIG.BATTLE_FEE,
      currency: 'USDC',
      recipient: X402_CONFIG.PAYMENT_RECIPIENT,
      description: `Battle entry fee for battle ${battleId}`,
      metadata: { battleId, type: 'battle_entry' },
    });
  };

  return {
    processPayment,
    createBattlePayment,
    isWalletConnected: !!walletClient,
  };
}

/**
 * Verify payment transaction on Base network
 */
export async function verifyPayment(transactionHash: string): Promise<boolean> {
  try {
    // In a real implementation, you would verify the transaction
    // by checking the blockchain or using a service like Alchemy/Infura
    const response = await fetch(`https://api.basescan.org/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=YourApiKeyToken`);
    const data = await response.json();
    
    return data.status === '1' && data.result?.status === '1';
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
}

/**
 * Get USDC balance for connected wallet
 */
export async function getUSDCBalance(walletAddress: string): Promise<string> {
  try {
    // This would typically use a provider to check the USDC balance
    // For now, returning a mock balance
    return '10.00'; // Mock balance of 10 USDC
  } catch (error) {
    console.error('Failed to get USDC balance:', error);
    return '0.00';
  }
}
