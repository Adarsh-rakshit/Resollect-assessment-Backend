import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoryRoutes from './routes/category.route.js';
import itemRoutes from './routes/item.route.js';

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
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/favicon.png', (req, res) => res.status(204));
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

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});

export default app;