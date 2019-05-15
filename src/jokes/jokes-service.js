const jwt = require('jsonwebtoken');

// liked jokes hardcoded for simplicity
const likedJokes = {
    "siar": [] //[{"id": 380, "joke": "Chuck Norris does not follow fashion trends, they follow him. But then he turns around and kicks their ass. Nobody follows Chuck Norris."}]
};

module.exports = { getLikedJokes, likeJoke, dislikeJoke };

async function getLikedJokes(username) {
    return likedJokes[username];
}// end getLikedJokes()

async function likeJoke(username, joke) {
    const errorObj = {error: false, message: ""}
    if(!likedJokes[username])
        likedJokes[username] = [];
    const exists = likedJokes[username].find(likedJoke => {
        return likedJoke.id === joke.id;
    });// end find()

    // if this joke has already been liked
    if (exists){
        errorObj.error = true;
        errorObj.message = "Already Liked";
        return errorObj;
    }

    if(likedJokes[username].length >=10 ){
        errorObj.error = true;
        errorObj.message = "Max Number of Likes Reached";
        return errorObj;
    }
    // Store the joke as liked joke
    likedJokes[username].push(joke);

    // return the liked joke
    return joke;
}// end likeJoke()

async function dislikeJoke(username, jokeId) {
    let _likedJokes = [...likedJokes[username]];
    _likedJokes = _likedJokes.filter(likedJoke => {
        return likedJoke.id !== parseInt(jokeId);
    });// end find()
    likedJokes[username] = _likedJokes;
    return true;
}// end dislikeJoke()