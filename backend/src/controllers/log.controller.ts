import { Request, Response } from 'express';
import Log from '../models/RequestLog';

export const getLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    console.error("❌ Erreur dans getLogs", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
