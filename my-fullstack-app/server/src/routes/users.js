const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authorize = require('../middlewares/authorize'); // for verifying token

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
    res.status(201).json({message: "Successfully registered!"});
});

// ------ LOGIN ------
usersRouter.post('/login', async (req, res, next) => {
    const {userID, password} = req.body;

    const doesUserExist = await pool.query(`SELECT userid FROM users WHERE userid = $1`, [userID]);
    if (doesUserExist.rows.length === 0) return res.status(404).json({ error: "User not found" }); 

    try {
        // compare password with already existing
        const passwordTable = await pool.query("SELECT password FROM users WHERE userID = $1", [userID]);

        if (passwordTable.rows.length === 0) {
            return res.status(401).json({ error: "invalid userID or password "});
        }

        const hashedPassword = passwordTable.rows[0].password;

        const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
        if (!isCorrectPassword) {
            return res.status(401).json({ error: "password does not match!" });
        }

        // sign token and set ers.cookie
        const token = jwt.sign({ userID: userID }, 
            process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "LAX",    // protection against CSRF
            maxAge: 3600000,
            domain: '.onrender.com'
        });

        res.status(200).json({ message: "Successfully logged in!"});
    }
    catch (error) {
        res.status(500).json({ error: "Server error during login." });
    }
});

// ------ LOGOUT ------
usersRouter.post('/logout', (req, res, next) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: '.onrender.com',
    });
    res.status(200).json({ message: "Successfully logged out! "});
});

// ------ Authorize ------
usersRouter.post('/loginStatus', authorize, (req, res, next) => {
    res.status(200).json({ message: `You are still logged in as ${req.user.userID}!`});
});

// ------ Do I Still Have Cookie and JWT? WHO AM I? ------
usersRouter.get('/me', async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ isLoggedIn: false });
    
    try {
        const userID = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ isLoggedIn: true, userID});
    }
    catch (error) {
        res.status(401).json({ isLoggedIn: false });
    }
});

module.exports = usersRouter;