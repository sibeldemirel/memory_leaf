import express from 'express';
import userRoutes from './routes/user.routes';
import deckRoutes from './routes/deck.routes';
import cardRoutes from './routes/card.routes';
import reviewSessionRoutes from './routes/reviewSession.routes';
import mongoose from 'mongoose';
import { logRequest } from './middleware/logRequests';
import dotenv from 'dotenv';

dotenv.config();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000; // 5 secondes

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

async function bootstrap() {
  await connectWithRetry();

  const app = express();

  app.use(express.json());
  app.use(logRequest);

  app.use('/api', userRoutes);
  app.use('/api', deckRoutes);
  app.use('/api', cardRoutes);
  app.use('/api', reviewSessionRoutes);
    
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

bootstrap();