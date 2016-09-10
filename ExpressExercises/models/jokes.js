/**
 * Created by Kristian Nielsen on 08-09-2016.
 */
var jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];

function getRandomJoke(){
    var index = Math.floor((Math.random() * jokes.length));
    return jokes[index];
}

function addJoke(joke){
    jokes.push(joke)
}


module.exports = {
    allJokes : jokes,
    getRandomJoke : getRandomJoke,
    addJoke : addJoke
}

