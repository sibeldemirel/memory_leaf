import express from 'express';
import userRoutes from './routes/user.routes';
import deckRoutes from './routes/deck.routes';
import cardRoutes from './routes/card.routes';
import reviewSessionRoutes from './routes/reviewSession.routes';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', deckRoutes);
app.use('/api', cardRoutes);
app.use('/api', reviewSessionRoutes);


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
