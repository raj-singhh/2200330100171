const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const stockRoutes = require('./routes/stocks');

app.use(express.json());
app.use('/stocks', stockRoutes);
app.use('/stockcorrelation', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
