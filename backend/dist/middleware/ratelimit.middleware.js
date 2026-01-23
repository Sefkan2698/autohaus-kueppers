import rateLimit from 'express-rate-limit';
// Standard Rate Limit für alle API Routes
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100, // Max 100 Requests pro 15 Minuten
    message: 'Zu viele Anfragen, bitte später erneut versuchen',
    standardHeaders: true,
    legacyHeaders: false,
    // Validierung deaktivieren - wir vertrauen nur Nginx als Proxy
    validate: { trustProxy: false },
});
// Strenger Limiter für Auth Routes (Login/Register)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 5, // Max 5 Login-Versuche pro 15 Minuten
    message: 'Zu viele Login-Versuche, bitte später erneut versuchen',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Erfolgreiche Requests zählen nicht
    validate: { trustProxy: false },
});
// Limiter für Kontaktformular
export const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 Stunde
    max: 3, // Max 3 Kontaktanfragen pro Stunde
    message: 'Zu viele Kontaktanfragen, bitte später erneut versuchen',
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
});
// Limiter für File Uploads
export const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 20, // Max 20 Uploads pro 15 Minuten
    message: 'Zu viele Uploads, bitte später erneut versuchen',
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
});
//# sourceMappingURL=ratelimit.middleware.js.map