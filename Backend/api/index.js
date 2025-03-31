import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.route';
import itemRoutes from './routes/item.route';

// Load env variables if not loaded in index.js
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('API is running! Access categories at /api/categories and items at /api/items');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

export default app; 