const express = require('express');
const router = express.Router();
const { calculateAverage } = require('../utils/average');
const { calculateCorrelation } = require('../utils/correlation');
const fs = require('fs');
const path = require('path');

const fetchStockData = async (ticker) => {
  try {
    const filePath = path.join(__dirname, '..', 'mock', `${ticker}.json`);
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Data not found for ticker: ${ticker}`);
  }
};

router.get('/:ticker', async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;
  const toTime = new Date();
  const fromTime = new Date(toTime - minutes * 60000);

  try {
    const data = await fetchStockData(ticker);

    const priceHistory = data.filter(entry => {
      const time = new Date(entry.lastUpdatedAt);
      return time >= fromTime && time <= toTime;
    });

    if (aggregation === 'average') {
      const avg = calculateAverage(priceHistory);
      return res.json({
        averageStockPrice: avg,
        priceHistory,
      });
    }

    res.status(400).json({ error: "Invalid aggregation type" });
  } catch (err) {
    console.error(' /:ticker route error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const { minutes, ticker: tickers } = req.query;
  const [ticker1, ticker2] = Array.isArray(tickers) ? tickers : [tickers];

  if (!ticker1 || !ticker2) {
    return res.status(400).json({ error: "2 tickers required" });
  }

  const toTime = new Date();
  const fromTime = new Date(toTime - minutes * 60000);

  try {
    const [data1, data2] = await Promise.all([
      fetchStockData(ticker1),
      fetchStockData(ticker2)
    ]);

    const filterHistory = (data) => data.filter(d => {
      const t = new Date(d.lastUpdatedAt);
      return t >= fromTime && t <= toTime;
    });

    const history1 = filterHistory(data1);
    const history2 = filterHistory(data2);

    const correlation = calculateCorrelation(history1, history2);

    res.json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: calculateAverage(history1),
          priceHistory: history1
        },
        [ticker2]: {
          averagePrice: calculateAverage(history2),
          priceHistory: history2
        }
      }
    });
  } catch (err) {
    console.error(' /stockcorrelation route error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
