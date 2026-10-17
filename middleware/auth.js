// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token missing'
        });
    }

    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error) {
            console.log('/JWT verification error:', error.message)
            return res.status(403).json({
                message: "Invalid Token"
            });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;