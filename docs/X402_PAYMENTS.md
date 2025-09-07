# X402 Payment Flow Implementation

This document describes the implementation of the x402 payment flow for Trellendar Arena, enabling USDC payments on the Base network for battle entry fees.

## Overview

The x402 payment system allows users to pay battle entry fees using USDC on the Base network. The implementation uses wagmi's `useWalletClient` hook to interact with the user's wallet and process payments.

## Architecture

### Core Components

1. **Payment Utilities (`lib/payments.ts`)**
   - `useX402Payment()` - Main hook for payment processing
   - `verifyPayment()` - Transaction verification on Base network
   - `getUSDCBalance()` - USDC balance checking
   - `X402_CONFIG` - Payment configuration constants

2. **Payment Modal (`components/PaymentModal.tsx`)**
   - User interface for payment confirmation
   - Real-time payment status updates
   - Transaction hash display
   - Error handling and retry functionality

3. **Payment Test Component (`components/PaymentTest.tsx`)**
   - End-to-end testing of payment flow
   - Wallet connection verification
   - USDC balance checking
   - Payment processing validation

## Configuration

### Environment Variables

```bash
# Required: OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key

# Required: Payment recipient address
NEXT_PUBLIC_PAYMENT_RECIPIENT=0x742d35Cc6634C0532925a3b8D0C9e3e0C0e0e0e0

# Optional: BaseScan API key for verification
BASESCAN_API_KEY=your_basescan_api_key
```

### Payment Configuration

```typescript
export const X402_CONFIG = {
  // USDC on Base contract address
  USDC_CONTRACT: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  // Battle entry fee in USDC
  BATTLE_FEE: '1',
  // Payment recipient address
  PAYMENT_RECIPIENT: process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT,
};
```

## Usage

### Basic Payment Flow

1. User selects an NFT for battle
2. User clicks "FIND OPPONENT & PAY"
3. Payment modal opens showing:
   - Battle entry fee (1 USDC)
   - Payment recipient
   - Base network confirmation
4. User confirms payment in wallet
5. Transaction is processed on Base network
6. Battle begins upon successful payment

### Integration Example

```typescript
import { useX402Payment } from '@/lib/payments';

function BattleComponent() {
  const { createBattlePayment, isWalletConnected } = useX402Payment();

  const handleStartBattle = async (battleId: string) => {
    if (!isWalletConnected) return;
    
    const result = await createBattlePayment(battleId);
    
    if (result.success) {
      console.log('Payment successful:', result.transactionHash);
      // Start battle
    } else {
      console.error('Payment failed:', result.error);
    }
  };
}
```

## Technical Details

### USDC Contract Integration

The implementation uses the standard ERC-20 transfer function to send USDC:

```typescript
const transferData = {
  address: X402_CONFIG.USDC_CONTRACT,
  abi: [{
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  }],
  functionName: 'transfer',
  args: [recipient, parseUnits(amount, 6)], // USDC has 6 decimals
};
```

### Error Handling

The payment system includes comprehensive error handling:

- Wallet connection validation
- Insufficient balance detection
- Transaction failure recovery
- Network error handling
- User cancellation support

### Transaction Verification

Payments are verified using BaseScan API:

```typescript
export async function verifyPayment(transactionHash: string): Promise<boolean> {
  const response = await fetch(
    `https://api.basescan.org/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey}`
  );
  const data = await response.json();
  return data.status === '1' && data.result?.status === '1';
}
```

## Testing

### Manual Testing

1. Connect wallet to Base network
2. Ensure USDC balance > battle fee
3. Use the Payment Test component to verify:
   - Wallet connection
   - USDC balance retrieval
   - Payment processing
   - Transaction verification

### Test Component Usage

The `PaymentTest` component provides automated testing:

```typescript
<PaymentTest />
```

This component will:
- Verify wallet connection
- Check USDC balance
- Process a small test payment
- Verify transaction on-chain

## Security Considerations

1. **Payment Recipient Validation**
   - Recipient address is configurable via environment variables
   - Should be validated before deployment

2. **Amount Validation**
   - Payment amounts are validated before processing
   - USDC decimals (6) are properly handled

3. **Transaction Verification**
   - All payments are verified on-chain
   - Failed transactions are properly handled

4. **User Consent**
   - Users must explicitly confirm payments
   - Clear fee display before payment

## Deployment Checklist

- [ ] Set `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
- [ ] Set `NEXT_PUBLIC_PAYMENT_RECIPIENT` to correct address
- [ ] Verify USDC contract address for Base network
- [ ] Test payment flow on Base testnet
- [ ] Verify transaction verification works
- [ ] Test error handling scenarios
- [ ] Remove test components from production

## Troubleshooting

### Common Issues

1. **"Wallet not connected"**
   - Ensure user has connected wallet
   - Verify wagmi configuration

2. **"Insufficient balance"**
   - User needs USDC on Base network
   - Check USDC contract address

3. **"Transaction failed"**
   - Check network connectivity
   - Verify gas fees
   - Ensure recipient address is valid

4. **"Verification failed"**
   - Check BaseScan API key
   - Verify transaction hash format
   - Network delays may cause temporary failures

### Debug Mode

Enable debug logging by setting:

```typescript
console.log('Payment debug:', {
  walletConnected: isWalletConnected,
  amount: X402_CONFIG.BATTLE_FEE,
  recipient: X402_CONFIG.PAYMENT_RECIPIENT,
});
```
