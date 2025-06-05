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
    } catch {
      res.status(500).json({
        success: false,
        message: 'Failed to save request log',
      });
    }
  });

  next();
};
