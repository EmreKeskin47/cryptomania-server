const express = require("express");
const router = express.Router();
require("dotenv").config();
const finnhub = require("finnhub");

const key = process.env.FINNHUB_API_KEY;
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = key;
const finnhubClient = new finnhub.DefaultApi();

router.get("/:symbol", (req, response) => {
    let symbol = req.params.symbol.toUpperCase();
    let today = new Date();
    let prev = new Date();
    prev.setHours(prev.getHours() - 336);
    let todayUnix = Date.parse(today) / 1000;
    let prevUnix = Date.parse(prev) / 1000;

    finnhubClient.technicalIndicator(
        `BINANCE:${symbol}USDT`,
        "D",
        prevUnix,
        todayUnix,
        "rsi",
        {},
        (error, data, res) => {
            response.send(data);
        }
    );
});

module.exports = router;
