import React from 'react';

interface InputFieldProps {
  label: string; 
  value: number; 
  onChange: (newValue: number) => void; 
  min: number;
  max: number;
  step: number;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, min, max, step }) => {
  const handleIncrement = (increment: number) => {
    const newValue = value + increment;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <label>
        {label}:
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={() => handleIncrement(-step)}>-</button>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            style={{ width: '100px', textAlign: 'center' }}
          />
          <button onClick={() => handleIncrement(step)}>+</button>
        </div>
      </label>
    </div>
  );
};

export default InputField;