import { Router } from 'express';
import { getLogs } from '../controllers/log.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();
router.get('/logs', authenticateToken, requireAdmin, getLogs);
export default router;
