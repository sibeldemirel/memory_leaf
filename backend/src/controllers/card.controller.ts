import { RequestHandler } from 'express';
import {
  createCardService,
  getAllCardsService,
  updateCardService,
  deleteCardService,
  getCardsByDeckIdService,
} from '../services/card.service';

export const createCard: RequestHandler = async (req, res) => {
  try {
    const { question, answer, dueDate, deckId, status } = req.body;

    if (!question || !answer || !dueDate || !deckId) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const card = await createCardService({
      question,
      answer,
      dueDate: new Date(dueDate),
      deckId,
      status,
    });
    res.status(201).json({ success: true, data: card, message: 'Card created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating card : ', error });
  }
};

export const getAllCards: RequestHandler = async (_req, res) => {
  try {
    const cards = await getAllCardsService();
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching cards : ', error });
  }
};

export const getCardsByDeckId: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const cards = await getCardsByDeckIdService(id);
    res.status(200).json({
      success: true,
      data: cards,
      message: `Cartes du paquet ${id} récupérées avec succès`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des cartes du paquet : ', error });
  }
};

export const updateCard: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, dueDate, deckId, status } = req.body;

    const updatedCard = await updateCardService(id, {
      question,
      answer,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      deckId,
      status,
    });

    res.status(200).json({ success: true, data: updatedCard, message: 'Card updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating card : ', error });
  }
};

export const deleteCard: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCardService(id);
    res.status(200).json({ success: true, message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting card : ', error });
  }
};
