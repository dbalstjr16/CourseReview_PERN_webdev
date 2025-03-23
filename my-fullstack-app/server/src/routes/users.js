const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/database');
const bcrypt = require('bcrypt');

// ------ Authorize user ------ check if token is valid (ex. when going to profile page), not needed right now

// ------ Authenticate user ------ for logginging in (check if user and password is valid)

// ------ REGISTER ------
usersRouter.post('/register', async (req, res, next) => {
    const { userID, password } = req.body;

    // check if userID already exists
    const idExist = await pool.query(`SELECT * FROM users WHERE userID = $1`, [userID]);
    if (idExist.rows.length !== 0) {
        return res.status(409).json({error: "userID already exists!"});
    }

    // else hash the password and store into database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(`INSERT INTO users (userID, password) VALUES ($1, $2)`, 
        [userID, hashedPassword]
    );
    res.status(200).json({message: "Successfully registered!"});
});

// ------ LOGIN ------

// ------ LOGOUT ------

// ------ testing (DELETE BEFORE DEPLOYMENT) ------
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