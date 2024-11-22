import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartProps {
  data: { year: number; totalInvested: number; dividends: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => `Year ${item.year}`),
    datasets: [
      {
        label: 'Total Invested',
        data: data.map((item) => item.totalInvested),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Dividends',
        data: data.map((item) => item.dividends),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;