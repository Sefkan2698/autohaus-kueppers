import express from 'express';
// Middleware: Nur SUPER_ADMIN erlaubt
export const superAdminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Nicht authentifiziert' });
            return;
        }
        if (req.user.role !== 'SUPER_ADMIN') {
            res.status(403).json({ error: 'Keine Berechtigung. Superadmin erforderlich.' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};
//# sourceMappingURL=superadmin.middleware.js.map