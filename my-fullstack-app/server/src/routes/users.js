const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/database');

usersRouter.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log(result);
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = usersRouter;