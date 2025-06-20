import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip
} from 'chart.js';




ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const StockChart = ({ priceHistory, average }) => {
  const labels = priceHistory.map(p => new Date(p.lastUpdatedAt).toLocaleTimeString());
  const prices = priceHistory.map(p => p.price);
  const avgLine = new Array(prices.length).fill(average);

  return (
    <>
      <Typography variant="h6">Stock Prices & Average</Typography>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Price',
              data: prices,
              borderColor: 'blue',
              fill: false,
            },
            {
              label: 'Average',
              data: avgLine,
              borderColor: 'red',
              borderDash: [5, 5],
              fill: false,
            }
          ]
        }}
      />
    </>
  );
};

export default StockChart;
