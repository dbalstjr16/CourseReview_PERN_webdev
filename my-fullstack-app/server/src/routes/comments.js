const express = require('express');
const commentsRouter = express.Router();
const pool = require('../db/database');

commentsRouter.get('/:uniName/:courseName', async (req, res, next) => {
    const { uniName, courseName } = req.params;

    const decodedUni = decodeURIComponent(uniName);
    const decodedCourse = decodeURIComponent(courseName);
    
    const queryResult = await pool.query(
        `SELECT * 
        FROM universities u, courses, comments 
        WHERE u.id = courses.university_id AND courses.id = comments.courseid
        AND u.name = $1 AND courses.name = $2`, [decodedUni, decodedCourse]);
    
    return res.status(200).send(queryResult.rows);
});

commentsRouter.post('/postcomment', async (req, res, next) => {

});


module.exports = commentsRouter;