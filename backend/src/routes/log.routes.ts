import { Router } from 'express';
import { getLogs } from '../controllers/log.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Accès aux logs d’activité (réservé à l’admin)
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Récupérer les logs de requêtes HTTP
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste paginée des logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                       url:
 *                         type: string
 *                       statusCode:
 *                         type: integer
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès interdit (réservé à l’admin)
 */
router.get('/logs', authenticateToken, requireAdmin, getLogs);

export default router;
