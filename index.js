import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://api.spotify.com/v1";

//Spotify API Credentials

//const clientID = "";
//const clientSecret = "";
const yourAccessToken = process.env.YOUR_ACCESS_TOKEN;
console.log(`http://localhost:${yourAccessToken}`);

const config = {
    headers: { Authorization: `Bearer ${yourAccessToken}`},
};


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) =>  {
    res.render("index.ejs", {content: "Waiting for data..." });
});

//Get a Track by ID

app.post("/get-track", async (req, res) => {
    const trackId = req.body.id;
    try {
        const result = await axios.get(API_URL + "/tracks/" + trackId, config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

//Create a Playlist

app.post("/create-playlist", async (req, res) => {
    const userId = req.body.userId;
    const playList = req.body.playList;
    try {
        const result = await axios.post(API_URL + "/users/" + userId, playList, config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.get("/bearerToken", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/secrets", config);
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
