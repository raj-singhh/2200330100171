import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export const getStockAverage = (ticker, minutes) =>
  axios.get(`${BASE_URL}/stocks/${ticker}?minutes=${minutes}&aggregation=average`);

export const getStockCorrelation = (tickers, minutes) =>
  axios.get(`${BASE_URL}/stockcorrelation?minutes=${minutes}&ticker=${tickers[0]}&ticker=${tickers[1]}`);
