import React, { useState, useEffect } from 'react';
import InputField from './components/InputField';
import InvestmentOptionsModal from './components/InvestmentOptionsModal';
import { calculateInvestmentGrowth } from './utils/calculations';
import BarChart from './components/BarChart';
import Summary from './components/Summary';
import './App.css';
import './styles/global.css'

const App: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(100);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [investmentRate, setInvestmentRate] = useState<number>(8.91);
  const [investmentRateName, setInvestmentRateName] = useState<string>('MSCI World');

  const [investmentData, setInvestmentData] = useState<any[]>([]);

  useEffect(() => {
    const data = calculateInvestmentGrowth(
      initialInvestment,
      monthlyInvestment,
      investmentPeriod,
      investmentRate
    );
    setInvestmentData(data);
  }, [initialInvestment, monthlyInvestment, investmentPeriod, investmentRate]);

  const resetFields = () => {
    setInitialInvestment(1000);
    setMonthlyInvestment(100);
    setInvestmentPeriod(10);
    setInvestmentRate(8.91);
    setInvestmentRateName('MSCI World');
  };

  const handleSelectRate = (rate: { name: string; value: number }) => {
    setInvestmentRate(rate.value);
    setInvestmentRateName(rate.name);
    setIsModalOpen(false);
  };

  const totalInvested = investmentData.length > 0 ? investmentData[investmentData.length - 1].totalInvested : 0;
  const totalValue = investmentData.length > 0 ? investmentData[investmentData.length - 1].totalValue : 0;
  const totalDividends = investmentData.length > 0 ? investmentData[investmentData.length - 1].dividends : 0;

  return (
    <div className="container">
      <h1 className="header">Investment Calculator</h1>
  
      
      <div className="input-grid">
        <InputField
          label="Initial Investment (£)"
          value={initialInvestment}
          onChange={setInitialInvestment}
          min={1}
          max={100000}
          step={1000}
        />
        <InputField
          label="Monthly Investment (£)"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={1}
          max={10000}
          step={100}
        />
        <InputField
          label="Investment Period (Years)"
          value={investmentPeriod}
          onChange={setInvestmentPeriod}
          min={1}
          max={40}
          step={1}
        />
        <div className="rate-container">
          <p>Choose an investment rate:</p>
          <span className="rate-value">{investmentRateName} </span>
          <button onClick={() => setIsModalOpen(true)} className="button-primary">
            Change Rate
          </button>
        </div>
      </div>
  
      
      <button onClick={resetFields} className="button-reset">
        Reset
      </button>
  
      
      <div className="card">
        <h2>Investment Growth</h2>
        <BarChart data={investmentData} />
      </div>
  
      
      <div className="card">
        <Summary
          totalInvested={totalInvested}
          totalValue={totalValue}
          totalDividends={totalDividends}
        />
      </div>
  
      <InvestmentOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(rate) => handleSelectRate(rate)}
      />
    </div>
  );
};

export default App;