const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const jokesService = require('./jokes/jokes-service');

const jwt = require('./jwt');

const { Debug } = require('./utilities/debug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use(function (req, res, next) {

    Debug.LogRequest(req)
    
    var oldWrite = res.write,
        oldEnd = res.end;

    var chunks = [];

    res.write = function (chunk) {
        chunks.push(chunk);
        oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk)
            chunks.push(chunk);

        var body = Buffer.concat(chunks).toString('utf8');

        Debug.LogResponse(JSON.parse(body));

        oldEnd.apply(res, arguments);
    };
    
    next();
});

app.use("/user", require('./user/user-controller'));
app.use("/jokes", require('./jokes/jokes-controller'));

app.delete("/jokes/like/:jokeId", function (req, res, next) {
    const jokeId = req.params["jokeId"];
    jokesService.dislikeJoke(req.user.username, jokeId)
    .then(joke => {
        if (joke)
            res.json({success: true});
        else
            res.status(400).json({ message: 'Error while remove a liked joke' });
    })
    .catch(err => {
        next(err)
    });// end jokesService.dislikeJoke()
});

// Global Error Handler
app.use(function (err, req, res, next) {
    Debug.Log("Global Error");
    Debug.LogDir(err);
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
});

const port = 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});