import { Router } from 'express';
import { createDeck, deleteDeck, getAllDecks, updateDeck } from '../controllers/deck.controller';

const router = Router();

router.post('/decks', createDeck);
router.get('/decks', getAllDecks);
router.put('/decks/:id', updateDeck);
router.delete('/decks/:id', deleteDeck);


export default router;
