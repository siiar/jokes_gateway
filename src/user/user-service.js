const config = require('../config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity
const users = [{ id: 1, username: 'siar', password: 'siar', name: 'Siar Ahmadi'}];

module.exports = { authenticate, register };

async function authenticate(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }// end if
}// end authenticate()

async function register(username, password, name) {
    const errorObj = {error: false, message: ""};

    const exists = users.find(u => {
        return (u.username === username);
    });// end find()

    if (exists){
        errorObj.error=true;
        errorObj.message = "User Already Exists";
        return errorObj;
    }

    const length = users.length;
    const user = {id: length + 1, username, password, name};
    users.push(user);

    return {id: length + 1, username, name};
}// end register()