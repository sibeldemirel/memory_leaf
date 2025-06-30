import { Router } from 'express';
import {
  createCard,
  getAllCards,
  updateCard,
  deleteCard
} from '../controllers/card.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Gestion des cartes mémoire
 */

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Créer une nouvelle carte
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               deckId:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [NEW, LEARNING, REVIEW]
 *     responses:
 *       201:
 *         description: Carte créée
 */
router.post('/cards', createCard);

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Récupérer toutes les cartes
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des cartes
 */
router.get('/cards', getAllCards);

/**
 * @swagger
 * /api/cards/{id}:
 *   put:
 *     summary: Mettre à jour une carte
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carte
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carte mise à jour
 *       404:
 *         description: Carte non trouvée
 */
router.put('/cards/:id', updateCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Supprimer une carte
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carte
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carte supprimée
 *       404:
 *         description: Carte non trouvée
 */
router.delete('/cards/:id', deleteCard);

export default router;
