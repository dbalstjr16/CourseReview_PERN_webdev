const express = require('express');
const commentsRouter = express.Router();
const pool = require('../db/database');

// ------ Send List of Comments Based on University and Cousre Name ------
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

// ------ Update Comments Relation with New Comment Record ------
commentsRouter.post('/postcomment', async (req, res, next) => {
    const { userid, courseid, content } = req.body; 
    
    try {
        await pool.query(`INSERT INTO comments (userid, courseid, content) 
            VALUES ($1, $2, $3)`, [userid, courseid, content]);
        return res.status(200).json({ message: 'Successfully posted comment!' });
    }
    catch (error) {
        return res.status(400).json({ error: `Error posting comment` });
    }
});

// ------ Delete Record from Comments Relation ------
commentsRouter.delete('/deletecomment', async (req, res, next) => {
    const { id } = req.body;

    try {
        await pool.query(`DELETE FROM comments
            WHERE id = $1`, [id]);
        return res.status(200).json({ message: "Successfully deleted comment!" });
    }
    catch (error) {
        return res.status(500).json({ error: `Error deleting comment` });
    }
})

module.exports = commentsRouter;