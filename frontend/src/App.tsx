import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<DetailsPage />} />
        <Route path="/checkout/:expId/:slotId" element={<CheckoutPage />} />
        <Route path="/result/:status/:bookingId?" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;