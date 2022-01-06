const express = require("express");
const router = express.Router();
var request = require("request");
require("dotenv").config();

const host = process.env.FEAR_GREED_HOST;
const key = process.env.FEAR_GREED_KEY;

var options = {
    method: "GET",
    url: "https://fear-and-greed-index.p.rapidapi.com/v1/fgi",
    headers: {
        "x-rapidapi-host": `${host}`,
        "x-rapidapi-key": `${key}`,
    },
};

router.get("/", (req, res) => {
    request(options, (err, body) => {
        if (err) {
            return console.log(err);
        }
        res.send(body.body);
    });
});

module.exports = router;
