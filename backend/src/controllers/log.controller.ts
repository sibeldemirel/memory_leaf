import { Request, Response } from 'express';
import Log from '../models/RequestLog';

export const getLogs = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Log.countDocuments();

    res.json({ logs, total });
  } catch (error) {
    res.status(500).json({ "❌ Erreur dans getLogs": error });
  }
};
