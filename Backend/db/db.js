import pg from 'pg';
import dotenv from 'dotenv';

// Only include this if not already called in index.js
dotenv.config();

const { Pool } = pg;

// Create the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true // Required for Neon
  }
});

// Optional: Log when the pool creates a new client
pool.on('connect', () => {
  console.log('New database connection established');
});

// Optional: Error handler for unexpected errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;