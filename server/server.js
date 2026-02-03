import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import connectDB from './configs/mongodb.js';

const app = express();

let isConnected = false;

// connect DB lazily (serverless-safe)
async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

// middlewares
app.use(express.json());
app.use(cors());

// ensure DB before handling requests
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

// health check
app.get('/api/health', (req, res) => {
  res.send("API Working");
});

export default app;
