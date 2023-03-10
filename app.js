// declaring and importing libraries
const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const fs = require("fs");

// express set up
const app = express();
app.set('view engine', 'ejs'); // setting up front end 
app.use(bodyParser.urlencoded({extended: true})); // required for parsing objects for POST requests
app.use(express.static("public")); // public folder used for static files

// Default API endpoint (random dog image)
let url = "https://dog.ceo/api/breeds/image/random";

// Fetches a dog image via API request
async function getImage()
{
  
  try {
    const {data:response} = await axios.get(url)
    return response;
  }
    
  catch (error) {
    console.log(error);
  }
      
}

// Returns array of dog breeds from text file
function getLines()
{
  var array = fs.readFileSync('breeds.txt').toString().split("\n");

  return array;
}

// Home page
app.get("/", function (req, res){

  var dogBreeds = getLines();

  res.render("home", {breeds: dogBreeds});
});

// Retrieves a new image to rate for every GET request
app.get("/rate", (req, res) => {
    let image = getImage();
    image.then(result => {
        res.render("rate", {imgURL: result.message});
    })
    
});

// Get Random dog
app.get("/random", function(req, res){
  url = "https://dog.ceo/api/breeds/image/random";

  res.redirect("/rate");
})

// Handles rating submitted by user
app.post("/rate", function(req, res){
  res.redirect("/rate");
});

// Get history of ratings and pictures
app.get("/history", function(req, res) {
  res.render("history");
})

// Get pictures of specific breed
app.get("/breed/:breedName", function(req, res){
  let breedName = req.params['breedName'];

  url = "https://dog.ceo/api/breed/" + breedName + "/images/random";

  res.redirect("/rate");
})

// Set up local host port
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });