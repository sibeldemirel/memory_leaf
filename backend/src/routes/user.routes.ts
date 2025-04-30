import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserDecks, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id/decks', getUserDecks);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
