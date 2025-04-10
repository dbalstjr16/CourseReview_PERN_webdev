const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Render requires this for SSL
    },
});

/** 
const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
*/

module.exports = pool;