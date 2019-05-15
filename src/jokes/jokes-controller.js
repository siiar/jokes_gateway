const axios = require('axios');
const express = require('express');
const router = express.Router();
const jokesService = require('./jokes-service');
const { Debug } = require('../utilities/debug');

// routes
router.get('/random/:limit', getRandomJokes);
router.get('/liked', getLikedJokes);

router.post('/like', likeJoke);


module.exports = router;

function getRandomJokes(req, res, next) {
    const limit = req.params['limit'];
    axios.get('http://api.icndb.com/jokes/random/' + limit)
    .then(response => {
        const jokes =  response.data["value"];
        res.json({jokes: jokes});

    })
    .catch(err => {
        next(err)
    });// end axios.get()
}// end getRandomJokes()

function getLikedJokes(req, res, next) {
    jokesService.getLikedJokes(req.user.username)
        .then(jokes => {
            if (jokes)
                res.json(jokes);
            else
                res.status(400).json({ message: 'No Liked Jokes' });
        })
        .catch(err => {
            next(err);
        });// end jokesService.getLikedJokes()
}// end getLikedJokes()

function likeJoke(req, res, next) {
    const joke = req.body;
    jokesService.likeJoke(req.user.username, joke)
        .then(joke => {
            if (joke && !joke.error)
                res.json(joke);
            else
                res.status(400).json({ message: joke.message});
        })
        .catch(err => {
            next(err)
        });// end jokesService.likeJoke()
}// end likeJoke()