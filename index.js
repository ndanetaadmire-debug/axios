import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// requesting for the homepage
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});


//requesting as per user inputs
app.post("/", async (req, res) => {
  try{
    const participants =req.body.participants;
const type = req.body.type; 
   const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
   
   const result = response.data;
    const randomActivities = result[Math.floor(Math.random() * result.length)];
    res.render("index.ejs", { data: randomActivities });}
catch (error) {
    console.error("Failed to make request:", error.message);
    
    let errorMessage = "An error occurred. Please try again.";
    if (error.response && error.response.status === 404) {
      errorMessage = "No activities that match your criteria.";
    }

    res.render("index.ejs", {
      error: errorMessage,
    });
  }});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
