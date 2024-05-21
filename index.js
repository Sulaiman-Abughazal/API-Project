import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
//var geoip = import("geoip-lite");
const port = 3000;
const app = express();
app.use(bodyParser.json()); // This middleware parses JSON-formatted request bodies.
//var port = 3000;
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.render("home.ejs");
   // console.log(req);
  });

  app.post("/location", async (req, res) => {
     try {
      //const response = await axios.get("https://bored-api.appbrewery.com/filter?type=" + req.body.type + "&participants=" + req.body.participants);
      //const response = await axios.get("https://bored-api.appbrewery.com/filter?type=" + req.body.type + "&participants=" + req.body.participants);
      //const result = response.data;
       //console.log(result[0]);
       const { latitude, longitude } = req.body;
       console.log(`Received latitude: ${latitude}, longitude: ${longitude}`);
       //in google earth u have to put the latitude first then comma the longitude
       res.status(200).json({ message: 'Data received successfullylengle' });
     } catch (error) {
       console.error("Failed to make request:", error.message);
       res.render("index.ejs", {
         error: error.message,
       });
     }
   });
 
   

app.listen(port);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

