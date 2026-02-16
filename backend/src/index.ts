import express from 'express';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import jobRoutes from './routes/job.routes.js';
import infobannerRoutes from './routes/infobanner.routes.js';
import carouselRoutes from './routes/carousel.routes.js';
import contactRoutes from './routes/contact.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import teamRoutes from './routes/team.routes.js';
import userRoutes from './routes/user.routes.js';
import newModelRoutes from './routes/newmodel.routes.js';
import corsMiddleware from './middleware/cors.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy - vertraue nur dem ersten Proxy (Nginx)
// 1 = nur der erste Hop wird als vertrauenswürdig angesehen
app.set('trust proxy', 1);

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
app.use('/api/team', teamRoutes);
app.use('/api/users', userRoutes);
app.use('/api/new-models', newModelRoutes);

// 404 Handler (nach allen Routes)
app.use(notFoundHandler);

// Global Error Handler (als letztes)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});