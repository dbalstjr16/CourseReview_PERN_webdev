// ------ import and setup ------
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// ------ path: /users  ------ 
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// ------ path: /search  ------ 
const searchRouter = require('./routes/search');
app.use('/search', searchRouter);


// ------ path: /comments  ------ 
const commentsRouter = require('./routes/comments');
app.use('/comments', commentsRouter);

// ------ run server ------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`);
});
