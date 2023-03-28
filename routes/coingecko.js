const express = require("express");
const router = express.Router();
var request = require("request");
const { writeToBinance, writeToGate } = require("../helpers/MarketPairCheck");
const axios = require("axios");

//get method for api/v1/coingecko/dominance returns dominance of top ten coins
router.get("/dominance", (req, res) => {
    request("https://api.coingecko.com/api/v3/global", (err, body) => {
        if (err) {
            return console.log(err);
        }
        res.send(body.body);
    });
});

//Top-7 trending coins on CoinGecko as searched by users in the last 24 hours
router.get("/trend", (req, res) => {
    request("https://api.coingecko.com/api/v3/search/trending", (err, body) => {
        if (err) {
            return console.log(err);
        }
        res.send(body.body);
    });
});

//List all status_updates with data (description, category, created_at, user, user_title and pin)
router.get("/updates", (req, res) => {
    request("https://api.coingecko.com/api/v3/status_updates", (err, body) => {
        if (err) {
            return console.log(err);
        }
        res.send(body.body);
    });
});

//Get public companies bitcoinholdings (Ordered by total holdings descending)
router.get("/company_btc", (req, res) => {
    request(
        "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin",
        (err, body) => {
            if (err) {
                return console.log(err);
            }
            res.send(body.body);
        }
    );
});

//Get public companies ethereum holdings (Ordered by total holdings descending)
router.get("/company_eth", (req, res) => {
    request(
        "https://api.coingecko.com/api/v3/companies/public_treasury/ethereum",
        (err, body) => {
            if (err) {
                return console.log(err);
            }
            res.send(body.body);
        }
    );
});

//List all finance products
router.get("/finance_products", (req, res) => {
    request(
        "https://api.coingecko.com/api/v3/finance_products        ",
        (err, body) => {
            if (err) {
                return console.log(err);
            }
            res.send(body.body);
        }
    );
});

//Get all coins in binance and gate
router.get("/get_all_binance", async (req, res) => {
    for (let page = 1; page <= 15; page++) {
        let data = await axios.get(
            `https://api.coingecko.com/api/v3/exchanges/binance/tickers?page=${page}`
        );

        for (let i = 0; i <= data.data.tickers.length; i++) {
            if (data.data.tickers[i] && data.data.tickers[i].base) {
                writeToBinance(data.data.tickers[i].base);
            }
        }
    }
    res.send("Success");
});

router.get("/get_all_gate", async (req, res) => {
    for (let page = 1; page <= 20; page++) {
        let data = await axios.get(
            `https://api.coingecko.com/api/v3/exchanges/gate/tickers?page=${page}`
        );

        for (let i = 0; i <= data.data.tickers.length; i++) {
            if (data.data.tickers[i] && data.data.tickers[i].base) {
                writeToGate(data.data.tickers[i].base);
            }
        }
    }
    res.send("Success");
});
module.exports = router;
