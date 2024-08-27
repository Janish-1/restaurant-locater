const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, token failed' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Not authorized, token failed' });
    }
};

const refreshToken = async (req, res) => {
    const { token } = req.body; // Expecting the token to be in the body of the request

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token: newToken });
    } catch (error) {
        return res.status(401).json({ error: 'Token verification failed' });
    }
};

module.exports = { protect, refreshToken };
