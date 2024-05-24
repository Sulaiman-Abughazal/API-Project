import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

const apiKey = process.env.API_KEY;
const port = process.env.PORT

const app = express();

app.use(bodyParser.json()); // This middleware parses JSON-formatted request bodies.
//it's a very important middleware !
//when you expecting A json u have to use it 
//it reads the raw data from the request and parse it to java object
// you cant do parse to the request.body directly without this middleware
//i think when the handler is waiting json i'ts the one that creat the req.body :o
//without it there is no req.body :) !!
//how it knows how to dealing with the data ?
//the fetch function in the fronend should have this indise it :
// headers: {
 // 'Content-Type': 'application/json'
//},
//........................................................................................
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));//for parsing bodies of requests that have the Content-Type:
// header set to application/x-www-form-urlencoded/
//if all the data that we waiting for is formated json i think we can drop whis middleware.
//if I turn it off in this project the lon and lati still arrive correctly.
//....................................................................................................
const Api_key = apiKey;


  app.get("/", (req, res) => {
    res.render("home.ejs");
  });

  app.post("/location", async (req, res) => {
    try {
        const { latitude, longitude } = req.body; // Extract latitude and longitude from the request body
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Api_key}&units=metric`);
        const weatherData = response.data;

        // Send a structured response containing the weather data
        res.json({
            success: true,
            data: {
                temperature: weatherData.main.temp,
                city: weatherData.name
            }
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve weather data",
            error: error.message
        });
    }
});




  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

