import { Routes, Route, Link } from 'react-router-dom';
import StockPage from './pages/StockPage';
import CorrelationPage from './pages/CorrelationPage';
import { Button, Stack } from '@mui/material';

function App() {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button component={Link} to="/" variant="contained">Stock Page</Button>
        <Button component={Link} to="/correlation" variant="outlined">Correlation</Button>
      </Stack>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/correlation" element={<CorrelationPage />} />
      </Routes>
    </>
  );
}

export default App;
