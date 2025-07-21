import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';

import connectDB from './configs/db.js';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

// Connect to MongoDB
connectDB();
connectCloudinary();

const app = express();

// Middleware
app.use(cors());

// Use raw body ONLY for Clerk webhooks (needed for Svix verification)
app.use('/api/clerk', bodyParser.raw({ type: '*/*' }));

// Use JSON parser for all other routes
app.use(express.json());

// Clerk webhook route
app.use('/api/clerk', clerkWebhooks);

// Test route
app.get('/', (req, res) => {
  res.send('API is working ✅');
});
app.use('/api/user',userRouter);
app.use('/api/hotel',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);

// Do NOT call app.listen() on Vercel
// const port = process.env.PORT;

// app.listen(port, () => console.log(`server is running on port ${port}`));
export default app;
