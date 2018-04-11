//module and arguments
require("dotenv").config();
var keys = require('./keys.js');
var spotify = require("spotify");
var Twitter = require("twitter");
var fs = require("fs");
var client = new Twitter(keys.twitterKeys);
var input = process.argv[2];
var nodeArgs = process.argv;
var userInput = "";
// Loop through all the words in the node argument
for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        userInput += userInput + "+" + nodeArgs[i];
    } else {
        userInput = nodeArgs[i];
    }
}
//switch statement
switch (input) {
    case "my-tweets":
        myTweets();
        break;
        //-----------
    case "spotify-this-song":
        spotifyThisSong();
        break;
        //-----------
    case "movie-this":
        movieThis();
        break;
        //----------
    case "do-what-it-says":
        doWhatItSays();
        break;
        console.log("commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");
}
//a fuction that will append files to log.txt.This allows you to write less code to append files to log.txt
/*function appendThis(){
    fs.appendFile(log.txt, function(err) {

        // If this is an error then show it.
        if (err) {
          console.log(err);
        }
      
        // If there is  no err then console.log "file appended to log.txt"
        else {
          console.log("file appended to log.txt");
        }
      
      });
}*/
function myTweets() {
    var params = {
        user_name: "@jkabore1"
    };
    //get the data from twitter by using twitter npm api
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                var x = "created at :" + twited.created_at + "\r\n"
                "tweets :" + tweets[i].text;

            }
            console.log(x);

        } else {
            console.log(error);
        };

    })
}

//spotify
function spotifyThisSong() {


    spotify.search({
        type: 'track',
        query: 'we are the world'
    }, function (err, data) {
        var songName = data.tracks.items;
        for (var i = 0; i < songName.length; i++) {
            var songList = "Artist:" + '|' + songInfo[i].artists[0].name + "\r\n" +
                "-------------------------------------------------------------------"
            "Song:" + "|" + songInfo[i].name + "\r\n" +
                "--------------------------------------------------------------------"
            "Album the song is from:'|' " + songInfo[i].album.name + "\r\n" +
                "---------------------------------------------------------------------"
            "Preview Url: " + "|" + songInfo[i].preview_url;
            "----------------------------------------------------------------------"
            console.log(songList);

        }
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    });
}
// imdb
function movieThis() {
    

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=a2fe2732";
    
    //if the user does not type anything then suggest this movie
    if (userInput==="movie-this") {
        var movieUrl = "http://www.imdb.com/title/tt1825683/";
        var message = "If you haven't watched" + "'Black Panther,'" + "then you should:" + movieUrl;
        console.log(message);

    }else{
    //request movie using omdb api
    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            var movie = "Title: " + data.Title + "\r\n" +
                "Year: " + data.Year + "\r\n" +
                "Imdb Rating: " + data.imdbRating + "\r\n" +
                "Country: " + data.Country + "\r\n" +
                "Language: " + data.Language + "\r\n" +
                "Plot: " + data.Plot + "\r\n" +
                "Actors: " + data.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + data.tomatoRating;
            console.log(movie);
        }
    });}}

    function doWhatItSays() {
        // This block of code will read from the "random.txt" file.
        // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        // The code will store the contents of the reading inside the variable "data"
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }


        });
    }

