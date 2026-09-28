import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import resultRoutes from './routes/result.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed origins: env-configured production URLs + localhost for dev
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174',
].filter(Boolean);

// MIDDLEWARES (order matters)
app.use(clerkMiddleware());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());

// DB
connectDB();

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/result', resultRoutes);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start the server only in non-serverless environments (e.g. local dev, Render)
// On Vercel the app is exported as default and Vercel handles the port
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`server started on http://localhost:${PORT}`);
    });
}

export default app;