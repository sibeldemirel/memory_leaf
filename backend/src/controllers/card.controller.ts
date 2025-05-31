import { Request, Response, RequestHandler } from 'express';
import { createCardService, getAllCardsService, updateCardService, deleteCardService, getCardsByDeckIdService } from '../services/card.service';

export const createCard: RequestHandler = async (req, res) => {
  try {
    const { question, answer, pathname, dueDate, deckId } = req.body;

    if (!question || !answer || !pathname || !dueDate || !deckId) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const card = await createCardService({ question, answer, pathname, dueDate: new Date(dueDate), deckId });
    res.status(201).json({ success: true, data: card, message: 'Card created successfully' });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllCards: RequestHandler = async (req, res) => {
  try {
    const cards = await getAllCardsService();
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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
    console.error('Erreur lors de la récupération des cartes du deck', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

export const updateCard: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, pathname, dueDate, deckId } = req.body;

    const updatedCard = await updateCardService(id, {
      question,
      answer,
      pathname,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      deckId,
    });

    res.status(200).json({ success: true, data: updatedCard, message: 'Card updated successfully' });
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteCard: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCardService(id);

    res.status(200).json({ success: true, message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
