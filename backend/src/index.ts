import express from 'express';
import deckRoutes from './routes/deck.routes';
import cardRoutes from './routes/card.routes';

const app = express();

app.use(express.json());

app.use('/api', deckRoutes);
app.use('/api', cardRoutes);

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
