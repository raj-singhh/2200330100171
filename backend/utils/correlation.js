function mean(data) {
  return data.reduce((sum, val) => sum + val, 0) / data.length;
}

function stdDev(data, meanVal) {
  return Math.sqrt(data.reduce((sum, val) => sum + (val - meanVal) ** 2, 0) / (data.length - 1));
}

function calculateCorrelation(h1, h2) {
  const n = Math.min(h1.length, h2.length);
  const prices1 = h1.slice(0, n).map(e => e.price);
  const prices2 = h2.slice(0, n).map(e => e.price);

  const mean1 = mean(prices1);
  const mean2 = mean(prices2);

  const covariance = prices1.reduce((sum, x, i) => sum + (x - mean1) * (prices2[i] - mean2), 0) / (n - 1);
  const std1 = stdDev(prices1, mean1);
  const std2 = stdDev(prices2, mean2);

  return +(covariance / (std1 * std2)).toFixed(4);
}

module.exports = { calculateCorrelation };
