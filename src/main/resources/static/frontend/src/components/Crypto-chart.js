import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoChart = ({ historicalData, cryptoName }) => {
  if (!historicalData || historicalData.length === 0) {
    return <p>Loading chart...</p>;
  }

  // Extract timestamps & prices
  const labels = historicalData.map(item => new Date(item[0] * 1000).toLocaleDateString());
  const prices = historicalData.map(item => parseFloat(item[4])); // Closing prices

  const data = {
    labels,
    datasets: [
      {
        label: `${cryptoName} Price (USD)`,
        data: prices,
        borderColor: '#00d2ff',
        backgroundColor: 'rgba(0, 210, 255, 0.2)',
        pointRadius: 3,
        tension: 0.4, // Makes the line smooth
      },
    ],
  };

  return <Line data={data} />;
};

export default CryptoChart;
