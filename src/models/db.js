import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Function to test database connection
const testConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connection successful!');
        console.log('Current database time:', result.rows[0].now);
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Export database pool
export default pool;
export { testConnection };