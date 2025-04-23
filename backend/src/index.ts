import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

export default app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
