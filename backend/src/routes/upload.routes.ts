import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { uploadLimiter } from '../middleware/ratelimit.middleware.js';
import { convertToWebP } from '../utils/image.js';
import express from 'express';
import path from 'path';

const router = Router();

// Einzelnes Bild hochladen (Admin) - mit Rate Limiting
router.post('/image', authMiddleware, uploadLimiter, upload.single('image'), async (req: express.Request, res: express.Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Keine Datei hochgeladen' });
      return;
    }

    const webpPath = await convertToWebP(req.file.path);
    const filename = path.basename(webpPath);

    res.json({
      message: 'Bild erfolgreich hochgeladen',
      url: `/uploads/${filename}`,
      filename,
    });
  } catch (error) {
    console.error('Upload Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Hochladen' });
  }
});

// Mehrere Bilder hochladen (Admin) - mit Rate Limiting
router.post('/images', authMiddleware, uploadLimiter, upload.array('images', 10), async (req: express.Request, res: express.Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({ error: 'Keine Dateien hochgeladen' });
      return;
    }

    const convertedFiles = await Promise.all(
      req.files.map(async (file) => {
        const webpPath = await convertToWebP(file.path);
        const filename = path.basename(webpPath);
        return {
          url: `/uploads/${filename}`,
          filename,
        };
      })
    );

    res.json({
      message: `${convertedFiles.length} Bilder erfolgreich hochgeladen`,
      files: convertedFiles,
    });
  } catch (error) {
    console.error('Upload Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Hochladen' });
  }
});

export default router;