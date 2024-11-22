import React, { useState } from 'react';

interface InvestmentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (rate: { name: string; value: number }) => void;
}

const InvestmentOptionsModal: React.FC<InvestmentOptionsModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [customRate, setCustomRate] = useState<number | ''>('');

  const predefinedRates = [
    { label: 'MSCI World (8.91%)', value: 8.91 },
    { label: 'S&P 500 (11.19%)', value: 11.19 },
    { label: 'Money Market Funds (4.95%)', value: 4.95 },
  ];

  const handleSelect = (rate: { label: string; value: number }) => {
    onSelect({ name: rate.label, value: rate.value });
    onClose();
  };

  const handleCustomRateSubmit = () => {
    if (customRate !== '' && customRate >= 0 && customRate <= 100) {
      onSelect({ name: `Custom Rate (${customRate}%)`, value: Number(customRate) });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ margin: '100px auto', padding: '20px', backgroundColor: 'white', width: '300px', borderRadius: '10px' }}>
        <h3>Select Investment Rate</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {predefinedRates.map((rate) => (
            <li key={rate.value} style={{ margin: '10px 0' }}>
              <button onClick={() => handleSelect(rate)}>{rate.label}</button>
            </li>
          ))}
        </ul>
        <div>
          <label>
            Custom Rate (%):
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(Number(e.target.value) || '')}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </label>
          <button onClick={handleCustomRateSubmit}>Set Rate</button>
        </div>
        <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
      </div>
    </div>
  );
};

export default InvestmentOptionsModal;