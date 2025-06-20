import React, { useEffect, useState } from 'react';
import { getStockCorrelation } from '../api';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const getColor = (correlation) => {
  const intensity = Math.round(255 * Math.abs(correlation));
  return correlation >= 0
    ? `rgb(0, ${intensity}, 0, 0.7)`    
    : `rgb(${intensity}, 0, 0, 0.7)`;   
};

const CorrelationPage = () => {
  const [ticker1, setTicker1] = useState('NVDA');
  const [ticker2, setTicker2] = useState('PYPL');
  const [minutes, setMinutes] = useState(30);
  const [correlationData, setCorrelationData] = useState(null);

  const fetchData = () => {
    if (ticker1 && ticker2) {
      getStockCorrelation([ticker1, ticker2], minutes)
        .then(res => setCorrelationData(res.data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Stock Correlation Heatmap
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item>
          <TextField label="Ticker 1" value={ticker1} onChange={e => setTicker1(e.target.value)} />
        </Grid>
        <Grid item>
          <TextField label="Ticker 2" value={ticker2} onChange={e => setTicker2(e.target.value)} />
        </Grid>
        <Grid item>
          <TextField label="Minutes" type="number" value={minutes} onChange={e => setMinutes(e.target.value)} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={fetchData}>Get Correlation</Button>
        </Grid>
      </Grid>

      {correlationData && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: getColor(correlationData.correlation),
            color: '#fff',
            textAlign: 'center',
            width: 'fit-content',
            margin: 'auto'
          }}
        >
          <Typography variant="h6">
            {ticker1} vs {ticker2}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            ρ = {correlationData.correlation}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default CorrelationPage;
