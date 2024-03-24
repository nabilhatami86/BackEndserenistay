const jwt = require('jsonwebtoken');
const { User } = require('../models');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers['auth-token']; // Mengambil token dari header

        if (!token) {
            return res.status(401).json({ error: true, message: 'Access denied. Token is missing' });
        }

        const decodedToken = jwt.verify(token, 'your_secret_key');
        const userId = decodedToken.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(403).json({ error: true, message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ error: true, message: 'Access denied. User is not an admin' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

module.exports = isAdmin;
