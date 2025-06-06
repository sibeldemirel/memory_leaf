import { RequestHandler } from 'express';
import {
  createDeckService,
  deleteDeckService,
  getAllDecksService,
  updateDeckService,
} from '../services/deck.service';
import { slugify } from '../utils/slugify';
import { checkDeckAccess } from '../utils/checkDeckAccess';

export const createDeck: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user!;
    const pathname = slugify(name);

    if (!name || !pathname) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const deck = await createDeckService({
      name,
      pathname,
      userId: user.userId,
    });

    res.status(201).json({
      success: true,
      data: deck,
      message: 'Deck created successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating deck : ', error});
  }
};

export const getAllDecks: RequestHandler = async (req, res) => {
  try {
    const user = req.user!;
    const decks = await getAllDecksService(user);
    res.status(200).json({ success: true, data: decks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching decks : ', error });
  }
};

export const getDeckById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const access = await checkDeckAccess(id, user);
    if (!access.authorized) {
      res.status(access.status).json({ success: false, message: access.message });
      return;
    }

    res.status(200).json({ success: true, data: access.deck });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération du deck : ', error });
  }
};

export const updateDeck: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user!;

    if (!name) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const access = await checkDeckAccess(id, user);
    if (!access.authorized) {
      res.status(access.status).json({ success: false, message: access.message });
      return;
    }

    const updatedDeck = await updateDeckService({ id, name });

    res.status(200).json({
      success: true,
      data: updatedDeck,
      message: 'Deck updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating deck : ', error });
  }
};

export const deleteDeck: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const access = await checkDeckAccess(id, user);
    if (!access.authorized) {
     res.status(access.status).json({ success: false, message: access.message });
     return;
    }

    await deleteDeckService(id);

    res.status(200).json({ success: true, message: 'Deck deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting deck : ', error });
  }
};
