const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');


function verifyToken(req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'Autenticacion Invalida'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || jwtConfig.secret);
        
        if (!decoded) {
            return res.status(401).json({
                auth: false,
                message: 'Autenticacion Invalida'
            });
        }
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = verifyToken;