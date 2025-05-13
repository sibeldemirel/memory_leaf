import { Request, Response, RequestHandler } from 'express';
import { createDeckService, deleteDeckService, getAllDecksService, getDeckByIdService, updateDeckService } from '../services/deck.service';

export const createDeck: RequestHandler = async (req, res) => {
  try {
    const { name, pathname, userId } = req.body;

    if (!name || !pathname) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const deck = await createDeckService({ name, pathname, userId });

    res.status(201).json({ success: true, data: deck, message: 'Deck created successfully' });
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllDecks: RequestHandler = async (req, res) => {
  try {
    const decks = await getAllDecksService();
    res.status(200).json({ success: true, data: decks });
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getDeckById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deck = await getDeckByIdService(id);

    if (!deck) {
      res.status(404).json({ success: false, message: "Deck not found" });
    }

    res.status(200).json({ success: true, data: deck });
  } catch (error) {
    console.error("Erreur lors de la récupération du deck :", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateDeck: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pathname } = req.body;

    if (!name && !pathname) {
      res.status(400).json({ success: false, message: 'At least one field must be provided' });
      return;
    }

    const updatedDeck = await updateDeckService(id, { name, pathname });

    res.status(200).json({ success: true, data: updatedDeck, message: 'Deck updated successfully' });
  } catch (error) {
    console.error('Error updating deck:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteDeck: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteDeckService(id);

    res.status(200).json({ success: true, message: 'Deck deleted successfully' });
  } catch (error) {
    console.error('Error deleting deck:', error);

    if (error instanceof Error && error.message === 'Deck not found') {
      res.status(404).json({ success: false, message: 'Deck not found' });
      return;
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
