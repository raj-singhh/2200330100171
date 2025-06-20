import React, { useEffect, useState } from 'react';
import StockChart from '../components/StockChart';
import { getStockAverage } from '../api';
import { TextField, Container, Typography } from '@mui/material';

const StockPage = () => {
  const [ticker, setTicker] = useState('NVDA');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (ticker) {
      getStockAverage(ticker, minutes).then(res => setData(res.data));
    }
  }, [ticker, minutes]);

  return (
    <Container>
      <Typography variant="h5" my={2}>Stock Price Viewer</Typography>
      <TextField label="Ticker" value={ticker} onChange={e => setTicker(e.target.value)} sx={{ mr: 2 }} />
      <TextField label="Minutes" type="number" value={minutes} onChange={e => setMinutes(e.target.value)} />
      {data && <StockChart priceHistory={data.priceHistory} average={data.averageStockPrice} />}
    </Container>
  );
};

export default StockPage;
