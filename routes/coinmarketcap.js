const express = require("express");
const router = express.Router();
var request = require("request");
require("dotenv").config();

const key = process.env.COINMARKETCAP_API_KEY;
const header = {
    "X-CMC_PRO_API_KEY": `${key}`,
};

/* Error status 
    "status": {
        "timestamp": "2021-11-27T18:58:28.064Z",
        "error_code": 1001,
        "error_message": "This API Key is invalid.",
        "elapsed": 0,
        "credit_count": 0
    }
*/

//Binance 270 - Coinbase 89 - FTX 524
//https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest

//get method for api/v1/cmc/exchange/info/id, selected exchange info returned as response
router.get("/exchange/:id", (req, response) => {
    const customOptions = {
        url: `https://pro-api.coinmarketcap.com/v1/exchange/info?id=${req.params.id}`,
        headers: header,
    };
    request(customOptions, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        response.send(JSON.stringify(body));
    });
});

//Returns the latest global cryptocurrency market metrics. Use the "convert" option to return market values in multiple fiat and cryptocurrency conversions in the same call.
router.get("/global", (req, response) => {
    const customOptions = {
        url: "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
        headers: header,
    };
    request(customOptions, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        response.send(body);
    });
});

module.exports = router;
