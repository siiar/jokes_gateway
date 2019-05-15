const expressJwt = require('express-jwt');
const config = require('./config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            // routes without auth
            '/user/authenticate',
            '/user/register',
            '/jokes/random/10',
            '/jokes/random/1',
        ]
    });
}