import { Router } from 'express';
import {
  createReviewSession,
  deleteReviewSession,
  getCardsToReview,
} from '../controllers/reviewSession.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ReviewSessions
 *   description: Sessions de révision de cartes
 */

/**
 * @swagger
 * /api/review-sessions:
 *   post:
 *     summary: Créer une nouvelle session de révision
 *     tags: [ReviewSessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deckId
 *             properties:
 *               deckId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session de révision créée
 *       400:
 *         description: Données invalides
 */
router.post('/review-sessions', authenticateToken, createReviewSession);

/**
 * @swagger
 * /api/review-sessions/{deckId}/cards:
 *   get:
 *     summary: Récupérer les cartes à réviser pour un deck donné
 */
router.get('/review-sessions/:deckId/cards', authenticateToken, getCardsToReview);


/**
 * @swagger
 * /api/review-sessions/{sessionId}:
 *   delete:
 *     summary: Supprimer une session de révision
 */
router.delete('/review-sessions/:sessionId', authenticateToken, deleteReviewSession);

export default router;
