import { Router } from 'express';
import { createDeck, deleteDeck, getAllDecks, getDeckById, updateDeck } from '../controllers/deck.controller';
import { getCardsByDeckId } from '../controllers/card.controller';

const router = Router();

router.get('/decks/:id', getDeckById);
router.put('/decks/:id', updateDeck);
router.delete('/decks/:id', deleteDeck);
router.get('/decks/:id/cards', getCardsByDeckId);
router.post('/decks', createDeck);
router.get('/decks', getAllDecks);


export default router;
