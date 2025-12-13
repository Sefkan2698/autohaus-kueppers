import express from 'express';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import jobRoutes from './routes/job.routes.js';
import infobannerRoutes from './routes/infobanner.routes.js';
import carouselRoutes from './routes/carousel.routes.js';
import contactRoutes from './routes/contact.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import corsMiddleware from './middleware/cors.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Statische Dateien (Uploads verfügbar machen)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Autohaus API läuft' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/infobanner', infobannerRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Handler (nach allen Routes)
app.use(notFoundHandler);

// Global Error Handler (als letztes)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});