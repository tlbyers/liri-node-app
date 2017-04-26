// At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var fs = require("fs");
var inputString=process.argv;
var entSelection=inputString[2];
var TwitterPackage=require('twitter');
var request = require('request'); 
var spotify = require('spotify');
var keys=require("./keys.js");//grab twitter keys from js file 
var randomTitle;
var searchTitle;
  
// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they 
//were created at in your terminal/bash window.

if(entSelection==="my-tweets"){

   // var twitter = require('twitter');

    //read keys.js file - to get all of Twitter account datanod
    
    var T = new TwitterPackage(keys.twitterKeys);
    var params = {q:"TerriUnc207",count:20}

    T.get("search/tweets",params, gotData);

    function gotData(err,data, response){
      var tweets=data.statuses;
      for(var i=0;i<tweets.length;i++){
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
    }
  }
}


//    * `spotify-this-song`/ 
// 2. `node liri.js spotify-thipog9f/gg2111111111111111111111111111111111111111111111111111112s-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from

//    * if no song is provided then your program will default to
//      * "The Sign" by Ace of Base

else if (entSelection==="spotify-this-song"){

  var inquirer=require("inquirer");
 

  inquirer.prompt([
    {
     type:"input",
     name:"searchTitle",
     message:"What song would you like to search?"
    }
    ]).then(function myPlayList(user) {
      console.log(user.searchTitle);

          if (!user.searchTitle) {
              user.searchTitle = 'The Sign';
              artist='Ace of Base';
              console.log("-----------------------------------------------------------------------------------");
              console.log(user.searchTitle);
             
              spotify.search({ type: 'track', query: user.searchTitle, limit: 5 }, function(err, data) {
              if (err) {
                  console.log('Error occurred: ' + err);
                  return;
                  }
                  //Handle Data
                  var albumTrack = data.tracks.items;

                  for (i = 0; i < albumTrack.length; i++) {
                    if(albumTrack[i].artists[0].name===artist){
                    console.log("Artist: " + albumTrack[i].artists[0].name);
                    console.log("Album Title: " + albumTrack[i].album.name);
                    console.log("Spotify Link: " + albumTrack[i].external_urls.spotify);
                    console.log("Track Title: " + albumTrack[i].name);
                    console.log("-----------------------------------------------------------------------------------");
                    }
                  }
                })
              }

          else  {
              console.log("-----------------------------------------------------------------------------------");
              console.log(user.searchTitle);
              

              spotify.search({ type: 'track', query: user.searchTitle, limit: 5 }, function(err, data) {
                if (err) {
                console.log('Error occurred: ' + err);
                return;
                }
                //Handle Data
                var albumTrack = data.tracks.items;
                var artists;

               for (i = 0; i < albumTrack.length; i++) {
                console.log("Artist: " + albumTrack[i].artists[0].name);
                console.log("Album Title: " + albumTrack[i].album.name);
                console.log("Spotify Link: " + albumTrack[i].external_urls.spotify);
                console.log("Track Title: " + albumTrack[i].name);
                console.log("-----------------------------------------------------------------------------------");
                 }
              })
            }

         })
      }
    
    
   
   

//    * `movie-this`
// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//        * Rotten Tomatoes URL.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//      * It's on Netflix!


else if (entSelection==="movie-this"){

 // Grab the request package...
var request = require("request");
var title=process.argv[3];

    if (title===undefined){
      request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&r=json", function(error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

          // Then log the body from the site!
          console.log(body);
          }
        });
    }

    else{

      request("http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json", function(error, response, body) {

      // If the request was successful...
      if (!error && response.statusCode === 200) {

        // Then log the body from the site!
        console.log(body);
        }
      });
    }
}



// // 4. `node liri.js do-what-it-says`
// //    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
// //      * Feel free to change the text in that document to test out the feature for other commands.

// //    * `do-what-it-says
// else if (entSelection==="do-what-it-says"){

// }
else if (entSelection==="do-what-it-says"){
//else if (entSelection==="movie-this"){ Core node package for reading and writing files
    var fs = require("fs");

    // This block of code will create a file called "movies.txt".
    // It will then print "Inception, Die Hard" in the file
    fs.writeFile("randomTitle.txt", "spotify-this-song", function(err) {

      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }

      fs.readFile("randomTitle.txt", "utf8", function(err, data) {

      // Break the string down by comma separation and store the contents into the output array.
      var output = data.split(",");

      // Loop Through the newly created output array
      for (var i = 0; i < output.length; i++) {

        // Print each element (item) of the array/
        
        entSelection=output[i];
        console.log(entSelection);

        }
        if(entSelection==="spotify-this-song"){

          searchTitle="I Want it That Way";
         
          spotify.search({ type: 'track', query: searchTitle, limit: 5 }, function(err, data) {
            if (err) {
            console.log('Error occurred: ' + err);
            return;
            }
            //Handle Data
            var albumTrack = data.tracks.items;
            var artists;

           for (i = 0; i < albumTrack.length; i++) {
            console.log("Artist: " + albumTrack[i].artists[0].name);
            console.log("Album Title: " + albumTrack[i].album.name);
            console.log("Spotify Link: " + albumTrack[i].external_urls.spotify);
            console.log("Track Title: " + albumTrack[i].name);
            console.log("-----------------------------------------------------------------------------------");
             }
          })
        }
      });
    });
  }









