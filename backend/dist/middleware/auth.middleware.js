import express from 'express';
import authService from '../services/auth.service.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Keine Authentifizierung' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Kein Token vorhanden' });
            return;
        }
        const decoded = authService.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Ungültiger Token' });
    }
};
//# sourceMappingURL=auth.middleware.js.map