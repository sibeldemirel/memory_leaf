import { Request, RequestHandler, Response } from 'express';
import { createReviewSessionService, getCardsToReviewService } from '../services/reviewSession.service';

export const createReviewSession = async (req: Request, res: Response) => {
  try {
    const { userId, deckId } = req.body;

    if (!userId || !deckId) {
      res.status(400).json({ success: false, message: 'Missing userId or deckId' });
      return;
    }

    const session = await createReviewSessionService(userId, deckId);
    res.status(201).json({ success: true, data: session, message: 'Review session started' });
  } catch (error) {
    console.error('Error creating review session:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getCardsToReview: RequestHandler = async (req, res) => {
  try {
    const { deckId } = req.params;

    if (!deckId) {
      res.status(400).json({ message: 'Missing deckId' });
      return;
    }

    const cards = await getCardsToReviewService(deckId);
    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cards to review' });
  }
};