const express = require("express");
const router = express.Router();
var request = require("request");
const coindarCoinList = require("../helpers/CoindarCoinList");
const {
    checkIfExistsInBinanceGate,
    writeToCoindarList,
} = require("../helpers/MarketPairCheck");

require("dotenv").config();
const COINDAR_TOKEN = process.env.COINDAR_API_KEY;
const BASE_URL = process.env.COINDAR_BASE_URL;

router.get("/categories", (req, res) => {
    request(
        `${BASE_URL}/tags?access_token=${COINDAR_TOKEN}`,
        function (error, body) {
            if (error) throw new Error(error);
            res.send(body.body);
        }
    );
});

router.get("/events/:page/:sort", (req, res) => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let page = req.params.page;
    let sort = req.params.sort;
    request(
        `${BASE_URL}/events?access_token=${COINDAR_TOKEN}&page=${page}&page_size=99&filter_tags=1,3,5,6,9,10,11,14,15,16,17,19,20,21,22&filter_date_start=${year}-${month}-${day}&sort_by=${sort}`,
        function (error, body) {
            if (error) throw new Error(error);
            res.send(body.body);
        }
    );
});

router.get("/coin", (req, res) => {
    var data = [];
    for (let i = 0; i < coindarCoinList.length; i++) {
        let res = checkIfExistsInBinanceGate(coindarCoinList[i].symbol);
        if ((res && res.gate === true) || (res && res.binance === true)) {
            data.push({ ...coindarCoinList[i], ...res });
            console.log(data);
        }
    }
    res.send(data);

    // request(`${BASE_URL}/coins?access_token=${token}`, function (error, body) {
    //     if (error) throw new Error(error);
    //     res.send(body.body);
    // });
});

module.exports = router;
