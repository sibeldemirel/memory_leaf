import { Router } from 'express';
import {
  createDeck,
  deleteDeck,
  getAllDecks,
  getDeckById,
  updateDeck
} from '../controllers/deck.controller';
import { getCardsByDeckId } from '../controllers/card.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get("/decks", authenticateToken, getAllDecks );
router.post("/decks", authenticateToken, createDeck);
router.get("/decks/:id", authenticateToken, getDeckById);
router.put("/decks/:id", authenticateToken, updateDeck);
router.delete("/decks/:id", authenticateToken, deleteDeck);
router.get("/decks/:id/cards", authenticateToken, getCardsByDeckId);

export default router;
