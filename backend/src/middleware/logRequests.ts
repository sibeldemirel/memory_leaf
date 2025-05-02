import { Request, Response, NextFunction } from 'express';
import RequestLog from '../models/RequestLog';

export const logRequest = async (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', async () => {
    try {
      await RequestLog.create({
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du log de requête :', error);
    }
  });

  next();
};
