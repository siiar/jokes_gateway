const express = require('express');
const router = express.Router();
const userService = require('./user-service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);

module.exports = router;

function authenticate(req, res, next) {
    const { username, password } = req.body;
    userService.authenticate(username, password)
        .then(user => {
            if (user)
                res.json(user);
            else
                res.status(400).json({ message: 'Username or password is incorrect' });
        })
        .catch(err => {
            next(err);
        });// end userService.authenticate()
}// end authenticate()

function register(req, res, next) {
    const { username, password, name } = req.body;
    userService.register(username, password, name)
        .then(user => {
            if (user && !user.error)
                res.json(user);
            else
                res.status(400).json({ message: user.message});
        })
        .catch(err => {
            next(err)
        });// end userService.register()
}// end register()