const jwt = require('jsonwebtoken');

// ------ Authorize user ------
const authorize = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Invalid Token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // this outputs userID
        req.user = decoded; // decoded is object (ex. {userID: 'user1', ...})
        next();
    }
    catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = authorize;