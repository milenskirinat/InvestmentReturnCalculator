import React from 'react';

interface SummaryProps {
  totalInvested: number;
  totalValue: number;
  totalDividends: number;
}

const Summary: React.FC<SummaryProps> = ({ totalInvested, totalValue, totalDividends }) => {
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Summary</h2>
      <p><strong>Total Invested:</strong> £{totalInvested.toFixed(2)}</p>
      <p><strong>Total Value:</strong> £{totalValue.toFixed(2)}</p>
      <p><strong>Total Dividends:</strong> £{totalDividends.toFixed(2)}</p>
    </div>
  );
};

export default Summary;