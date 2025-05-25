import { Router } from 'express';
import { createDeck, deleteDeck, getAllDecks, getDeckById, updateDeck } from '../controllers/deck.controller';

const router = Router();

router.get('/decks/:id', getDeckById);
router.put('/decks/:id', updateDeck);
router.delete('/decks/:id', deleteDeck);
router.post('/decks', createDeck);
router.get('/decks', getAllDecks);


export default router;
