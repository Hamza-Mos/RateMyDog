const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
const fs = require("fs");

let url = "https://dog.ceo/api/breeds/image/random";
let breed = "";

/*
ISSUES:

- req params for filter by breed does not work half the time
- /rate route keeps breaking... why??
- how can i access input rating field?

*/

function setBreed(breedName)
{
  breed = breedName;
}

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

function getLines(filename)
{
  return fs.readFile(filename, "utf-8", function(err, data){
    if(err) {
        throw err;
    }

    // note: this assumes `data` is a string - you may need
    //       to coerce it - see the comments for an approach
    data+="";
    var lines = data.split('\n');

    console.log("success!");

    // console.log(lines);
    
    return "helloworld";
 })
}

function getLines2()
{
  var array = fs.readFileSync('breeds.txt').toString().split("\n");
  // console.log(array);
  return array;
}

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/rate", (req, res) => {
    console.log("entered URL: " + url);
    let image = getImage();
    image.then(result => {
        console.log(result.message);
        res.render("rate", {imgURL: result.message});
    })
    
});

app.get("/", function (req, res){

  var dogBreeds = getLines2();

  res.render("home", {breeds: dogBreeds});
})

app.post("/random", function(req, res){
  url = "https://dog.ceo/api/breeds/image/random";

  console.log("url: ", url);

  res.redirect("/rate");
})

// change this to update url
app.post("/rate", function(req, res){

  const rating = req.body.rating;
  const dog = req.body.dog;

  console.log("Rating: " + rating + "\t image: " + dog)
  res.redirect("/rate");
});

app.post("/", function(req, res){

  console.log("here!!");

  const breed = req.body.breedButton;

  url = "https://dog.ceo/api/breed/" + breed + "/images/random";

  console.log(url);
  res.redirect("/rate");
});

app.get("/history", function(req, res) {
  res.render("history");
})

app.get("/breed/:breedName", function(req, res){
  let breedName = req.params['breedName'];

  console.log(breedName);

  while(breedName.charAt(0).toLowerCase() == breedName.charAt(0).toUpperCase())
  {
    breedName = breedName.substring(1);
  }

  url = "https://dog.ceo/api/breed/" + breedName + "/images/random";

  res.redirect("/rate");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });