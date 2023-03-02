const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the latitude and longitude from the html form, display in console
    var lat = parseFloat(req.body.LatInput);
    var lon = parseFloat(req.body.LonInput);
    console.log("Latitude: " + lat + ", Longitude: " + lon);
    
    //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
    const units = "imperial";
    const apiKey = "24768611744b68dad8a27df536b1039f";   // custom apiKey
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherAPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const cloudiness = weatherData.clouds.all;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // displays the output of the results
            res.write("<h1> The weather is " + description + "<h1>");
            res.write("<h2>The Temperature is " + temp + " Degrees Fahrenheit<h2>");
            res.write("<h2>Humidity is " + humidity + "%<h2>");
            res.write("<h2>Wind Speed is " + windSpeed + " mph<h2>");
            res.write("<h2>Cloudiness is " + cloudiness + "%<h2>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});






/*
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the city name from the html form, display in console.
    var city = String(req.body.CityInput);
    console.log(req.body.CityInput);
    
    //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
    const units = "imperial";
    const apiKey = "24768611744b68dad8a27df536b1039f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open Weather API
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const Weathercity = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const pressure = weatherData.main.pressure;
          
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Temperature in " + Weathercity  + " is " + temp + " Degrees Fahrenheit<h2>");
            res.write("<p>Humidity: " + humidity + "%</p>");
            res.write("<p>Wind Speed: " + windSpeed + " mph</p>");
            res.write("<p>Min Temperature: " + minTemp + " Degrees Fahrenheit</p>");
            res.write("<p>Max Temperature: " + maxTemp + " Degrees Fahrenheit</p>");
            res.write("<p>Pressure: " + pressure + " hPa</p>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
*/