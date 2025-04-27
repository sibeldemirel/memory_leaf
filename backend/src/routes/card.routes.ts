import { Router } from 'express';
import { createCard, getAllCards, updateCard, deleteCard } from '../controllers/card.controller';

const router = Router();

router.post('/cards', createCard);
router.get('/cards', getAllCards);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;
