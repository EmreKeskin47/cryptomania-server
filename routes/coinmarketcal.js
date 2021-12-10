const express = require("express");
const router = express.Router();
var request = require("request");
const { writeToBinance } = require("../helpers/MarketPairCheck");

require("dotenv").config();
const key = process.env.COINMARKETCAL_API_KEY;
//Multiple fields (Coins and Categories) can be provided with comma separated ID string.
//returns page count in metadata, should be iterated to get all pages
/*
    "_metadata": {
        "max": 75,
        "page": 3,
        "page_count": 2,
        "total_count": 135
    },
*/
router.get("/events", (req, res) => {
    let page = 1;
    var opt = {
        method: "GET",
        url: `https://developers.coinmarketcal.com/v1/events?max=75&page=${page}&categories=1,2,4,11,14,17,18`,
        headers: {
            Accept: "application/json",
            "x-api-key": `${key}`,
        },
    };

    request(opt, function (error, body) {
        if (error) throw new Error(error);
        console.log(body._metadata);
        res.send(body.body);
    });
});

router.get("/market_search/:name", (req, res) => {
    let searchName = req.params.name.toLowerCase();
    var opt = {
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${searchName}`,
        headers: {
            Accept: "application/json",
            "x-api-key": `${key}`,
        },
    };

    //existsInTxt() -> checks both return false
    //
    request(opt, function (error, body) {
        if (error) throw new Error(error);
        console.log(body.body);
        res.send(body.body);
    });
    writeToBinance(searchName);
});

router.get("/categories", (req, res) => {
    var opt = {
        method: "GET",
        url: "https://developers.coinmarketcal.com/v1/categories",
        headers: {
            Accept: "application/json",
            "x-api-key": `${key}`,
        },
    };
    request(opt, function (error, body) {
        if (error) throw new Error(error);
        res.send(body.body);
    });
});

router.get("/coins", (req, res) => {
    var opt = {
        method: "GET",
        url: "https://developers.coinmarketcal.com/v1/coins",
        headers: {
            Accept: "application/json",
            "x-api-key": `${key}`,
        },
    };
    request(opt, function (error, body) {
        if (error) throw new Error(error);
        res.send(body.body);
    });
});

module.exports = router;
