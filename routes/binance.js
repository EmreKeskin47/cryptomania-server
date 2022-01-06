const express = require("express");
const router = express.Router();
var request = require("request");
require("dotenv").config();

const url = process.env.BINANCE_API_URL;

//get realtime price of given coin from binance
router.get("/price/:ticker", (req, res) => {
    let ticker = req.params.ticker.toUpperCase();
    request(`${url}/api/v3/ticker/price?symbol=${ticker}USDT`, (err, body) => {
        if (err) {
            return console.log(err);
        }
        res.send(body.body);
    });
});

//get realtime price chart data o a given ticker
router.get("/price-chart/:ticker", (req, res) => {
    let ticker = req.params.ticker.toUpperCase();
    let startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() - 30);
    let unixTime = Date.parse(startTime);

    request(
        `${url}/api/v3/klines?symbol=${ticker}&interval=1m&startTime=${unixTime}`,
        (err, body) => {
            if (err) {
                return console.log(err);
            }
            res.send(body.body);
        }
    );
});

module.exports = router;
