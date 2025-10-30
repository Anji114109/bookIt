import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Routes
import experienceRoutes from './routes/experiences.routes';
import bookingRoutes from './routes/bookings.routes';
import promoRoutes from './routes/promo.routes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/experiences', experienceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/promo', promoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});