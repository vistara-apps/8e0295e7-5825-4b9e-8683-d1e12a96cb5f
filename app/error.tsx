'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/ErrorStates';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Arena Error:', error);
  }, [error]);

  // Determine error type based on error message
  const getErrorType = () => {
    const message = error.message.toLowerCase();
    if (message.includes('network') || message.includes('fetch')) {
      return 'network';
    }
    if (message.includes('wallet') || message.includes('connection')) {
      return 'warning';
    }
    return 'error';
  };

  const getErrorMessage = () => {
    const type = getErrorType();
    switch (type) {
      case 'network':
        return 'Unable to connect to the Trellendar Arena servers. Please check your internet connection and try again.';
      case 'warning':
        return 'There was an issue with your wallet connection. Please reconnect your wallet and try again.';
      default:
        return 'The battle arena encountered an unexpected error. Don\'t worry, your NFTs are safe! Try restarting the arena.';
    }
  };

  return (
    <ErrorState
      type={getErrorType()}
      title={getErrorType() === 'network' ? 'Connection Lost' : 'Arena Malfunction'}
      message={getErrorMessage()}
      onRetry={reset}
      actionLabel="Report Issue"
      onAction={() => {
        // In a real app, this would open a support ticket or feedback form
        console.log('Error reported:', error);
        if (typeof window !== 'undefined') {
          const subject = encodeURIComponent('Trellendar Arena Error Report');
          const body = encodeURIComponent(`Error: ${error.message}\nDigest: ${error.digest || 'N/A'}`);
          window.open(`mailto:support@trellendar.com?subject=${subject}&body=${body}`, '_blank');
        }
      }}
    />
  );
}
