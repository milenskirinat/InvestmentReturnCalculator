export const calculateInvestmentGrowth = (
	initialInvestment: number,
	monthlyInvestment: number,
	investmentPeriod: number,
	annualRate: number
  ) => {
	const results = [];
	const monthlyRate = annualRate / 12 / 100;
	let totalInvested = 0;
	let totalValue = initialInvestment;
  
	for (let year = 1; year <= investmentPeriod; year++) {
	  for (let month = 1; month <= 12; month++) {
		totalInvested += monthlyInvestment;
		totalValue += monthlyInvestment;
		totalValue += totalValue * monthlyRate;
	  }
  
	  results.push({
		year,
		totalInvested,
		totalValue,
		dividends: totalValue - totalInvested,
	  });
	}
  
	return results;
  };