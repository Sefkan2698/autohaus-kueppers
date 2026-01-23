import cors from 'cors';
const allowedOrigins = [
    'http://localhost:3000', // Next.js Dev
    'http://localhost:3001', // Falls Frontend auf anderem Port
    'https://autohausk.sakaits.com', // Production Domain
    'http://autohausk.sakaits.com', // Production Domain (HTTP)
];
export const corsOptions = {
    origin: (origin, callback) => {
        // Erlaubt Requests ohne Origin (z.B. mobile apps, Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Erlaubt Cookies/Auth-Header
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
export default cors(corsOptions);
//# sourceMappingURL=cors.middleware.js.map