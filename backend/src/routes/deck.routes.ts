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

/**
 * @swagger
 * tags:
 *   name: Decks
 *   description: Gestion des paquets de cartes (Decks)
 */

/**
 * @swagger
 * /api/decks:
 *   get:
 *     summary: Récupérer tous les decks
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des decks
 */
router.get("/decks", authenticateToken, getAllDecks );

/**
 * @swagger
 * /api/decks:
 *   post:
 *     summary: Créer un nouveau deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               pathname:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deck créé
 */
router.post("/decks", authenticateToken, createDeck);

/**
 * @swagger
 * /api/decks/{id}:
 *   get:
 *     summary: Récupérer un deck par son ID
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du deck
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deck trouvé
 *       404:
 *         description: Deck non trouvé
 */
router.get("/decks/:id", authenticateToken, getDeckById);

/**
 * @swagger
 * /api/decks/{id}:
 *   put:
 *     summary: Mettre à jour un deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du deck
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               pathname:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deck mis à jour
 *       404:
 *         description: Deck non trouvé
 */
router.put("/decks/:id", authenticateToken, updateDeck);

/**
 * @swagger
 * /api/decks/{id}:
 *   delete:
 *     summary: Supprimer un deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du deck
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deck supprimé
 *       404:
 *         description: Deck non trouvé
 */
router.delete("/decks/:id", authenticateToken, deleteDeck);

/**
 * @swagger
 * /api/decks/{id}/cards:
 *   get:
 *     summary: Récupérer les cartes associées à un deck
 *     tags: [Decks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du deck
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des cartes du deck
 *       404:
 *         description: Deck non trouvé
 */
router.get("/decks/:id/cards", authenticateToken, getCardsByDeckId);

export default router;
