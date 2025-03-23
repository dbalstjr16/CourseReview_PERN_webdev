const express = require('express');
const searchRouter = express.Router();
const pool = require('../db/database');

searchRouter.get('/universityCourseName', async (req, res, next) => {
    const queryResult = await pool.query(
        `SELECT c.id, u.name AS uname, c.name AS cname 
        FROM universities u, courses c 
        WHERE u.id = c.university_id`
    );
    res.status(200).send(queryResult.rows);
});

module.exports = searchRouter;