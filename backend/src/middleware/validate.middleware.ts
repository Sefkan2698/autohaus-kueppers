import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error?.issues?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })) || [];

      return res.status(400).json({
        message: 'Validierung fehlgeschlagen',
        errors,
      });
    }

    next();
  };
};