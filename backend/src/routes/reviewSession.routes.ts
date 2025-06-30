import { Router } from 'express';
import { createReviewSession, deleteReviewSession, getCardsToReview } from '../controllers/reviewSession.controller';

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
 *               userId:
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

/**
 * @swagger
 * /api/review-sessions/{sessionId}:
 *   delete:
 *     summary: Supprimer une session de révision
 *     tags: [ReviewSessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: ID de la session
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session supprimée avec succès
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
router.delete('/review-sessions/:sessionId', deleteReviewSession);


export default router;
