import { Router } from 'express';
import { createReviewSession, getCardsToReview } from '../controllers/reviewSession.controller';

const router = Router();

router.post('/review-sessions', createReviewSession);
router.get('/review-sessions/:deckId/cards', getCardsToReview);


export default router;