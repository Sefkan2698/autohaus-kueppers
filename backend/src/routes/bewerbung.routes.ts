import { Router } from 'express';
import multer from 'multer';
import bewerbungController from '../controllers/bewerbung.controller.js';

const router = Router();

// PDF-only multer using memory storage (files stay in RAM, attached directly to email)
const pdfUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Nur PDF-Dateien sind erlaubt.'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 5,
  },
});

router.post(
  '/submit',
  pdfUpload.array('dokumente', 5),
  bewerbungController.submit.bind(bewerbungController)
);

export default router;