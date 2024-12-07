const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Middleware to verify if the user is authenticated
const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to verify if the user is an Event Manager
const isEventManager = (req, res, next) => {
    if (req.user.role !== 'EventManager') {
        return res.status(403).json({ message: 'Access denied: Event Manager only' });
    }
    next();
};

// Middleware to verify if the user is an Admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied: Admin only' });
    }
    next();
};

module.exports = { isAuthenticated, isEventManager, isAdmin };
