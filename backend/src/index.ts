import express from 'express';
import deckRoutes from './routes/deck.routes';

const app = express();

app.use(express.json()); // Important pour lire le body JSON

app.use('/api', deckRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

export default app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
