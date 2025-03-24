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

searchRouter.get('/getCourseID/:courseName', async (req, res, next) => {
    const { courseName } = req.params;

    try {
        const queryResult = await pool.query(`SELECT * FROM courses
            WHERE name=$1`, [courseName]);
        return res.status(200).send(queryResult.rows[0]);
    }   
    catch (error) {
        return res.status(500).json({ error: `Error fetching courseID` });
    }
});

module.exports = searchRouter;