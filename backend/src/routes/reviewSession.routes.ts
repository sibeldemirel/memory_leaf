import { Router } from 'express';
import { createReviewSession, getCardsToReview } from '../controllers/reviewSession.controller';

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
router.post('/review-sessions', createReviewSession);

/**
 * @swagger
 * /api/review-sessions/{deckId}/cards:
 *   get:
 *     summary: Récupérer les cartes à réviser pour un deck donné
 *     tags: [ReviewSessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deckId
 *         required: true
 *         description: ID du deck
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des cartes à réviser
 *       404:
 *         description: Deck non trouvé ou aucune carte à réviser
 */
router.get('/review-sessions/:deckId/cards', getCardsToReview);

export default router;
