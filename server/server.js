import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import connectDB from './configs/mongodb.js';

const app = express();

// Connect DB
await connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// Test route
app.get('/api/health', (req, res) => {
  res.send("API Working");
});

// ❌ REMOVE app.listen
export default app;
