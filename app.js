const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const fs = require("fs");

let url = "https://dog.ceo/api/breeds/image/random";

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

function getLines()
{
  var array = fs.readFileSync('breeds.txt').toString().split("\n");

  return array;
}

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/rate", (req, res) => {
    let image = getImage();
    image.then(result => {
        res.render("rate", {imgURL: result.message});
    })
    
});

app.get("/", function (req, res){

  var dogBreeds = getLines();

  res.render("home", {breeds: dogBreeds});
})

app.post("/random", function(req, res){
  url = "https://dog.ceo/api/breeds/image/random";

  res.redirect("/rate");
})

// change this to update url
app.post("/rate", function(req, res){
  res.redirect("/rate");
});

app.post("/", function(req, res){

  const breed = req.body.breedButton;

  url = "https://dog.ceo/api/breed/" + breed + "/images/random";
  res.redirect("/rate");
});

app.get("/history", function(req, res) {
  res.render("history");
})

app.get("/breed/:breedName", function(req, res){
  let breedName = req.params['breedName'];

  url = "https://dog.ceo/api/breed/" + breedName + "/images/random";

  res.redirect("/rate");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });