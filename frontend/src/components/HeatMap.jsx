import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const getColor = (corr) => {
  const intensity = Math.round(255 * Math.abs(corr));
  return `rgb(${corr < 0 ? intensity : 0}, ${corr > 0 ? intensity : 0}, 0.8)`;
};

const Heatmap = ({ correlationData }) => {
  const { correlation, stocks } = correlationData;

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Correlation Heatmap</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Paper style={{
            backgroundColor: getColor(correlation),
            color: '#fff',
            padding: '10px 20px',
          }}>
            <Typography>{Object.keys(stocks)[0]} vs {Object.keys(stocks)[1]}</Typography>
            <Typography>ρ = {correlation}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Heatmap;
