import express from 'express';
// Globaler Error Handler
export const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);
    // Prisma Errors
    if (err.code === 'P2002') {
        res.status(409).json({ error: 'Dieser Eintrag existiert bereits' });
        return;
    }
    if (err.code === 'P2025') {
        res.status(404).json({ error: 'Eintrag nicht gefunden' });
        return;
    }
    // Multer Errors (File Upload)
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ error: 'Datei zu groß (max 10MB)' });
            return;
        }
        res.status(400).json({ error: 'Fehler beim Datei-Upload' });
        return;
    }
    // JWT Errors
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({ error: 'Ungültiger Token' });
        return;
    }
    if (err.name === 'TokenExpiredError') {
        res.status(401).json({ error: 'Token abgelaufen' });
        return;
    }
    // Validation Errors
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
        return;
    }
    // Default Error
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || 'Interner Serverfehler',
    });
};
// 404 Handler
export const notFoundHandler = (req, res) => {
    res.status(404).json({ error: 'Route nicht gefunden' });
};
//# sourceMappingURL=error.middleware.js.map