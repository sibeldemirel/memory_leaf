import express from 'express';
import userRoutes from './routes/user.routes';
import deckRoutes from './routes/deck.routes';
import cardRoutes from './routes/card.routes';
import logRoutes from './routes/log.routes';
import reviewSessionRoutes from './routes/reviewSession.routes';
import mongoose from 'mongoose';
import { logRequest } from './middleware/logRequests';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/corsConfig';

dotenv.config();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(logRequest);

app.use('/api', userRoutes);
app.use('/api', deckRoutes);
app.use('/api', cardRoutes);
app.use('/api', logRoutes);
app.use('/api', reviewSessionRoutes);

async function connectWithRetry(retries = MAX_RETRIES): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error(`❌ MongoDB connection failed. Retries left: ${retries - 1}`, error);
    if (retries <= 1) {
      console.error('❌ No retries left. Exiting...');
      process.exit(1);
    }
    console.log(`⏳ Retrying MongoDB connection in ${RETRY_DELAY_MS / 1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    await connectWithRetry(retries - 1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = Number(process.env.PORT) || 5000;
  connectWithRetry().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  });
}

export default app;
