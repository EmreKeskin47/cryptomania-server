const express = require("express");
const router = express.Router();
var request = require("request");
require("dotenv").config();

const url = process.env.WHALE_ALERT_URL;
const key = process.env.WHALE_ALERT_KEY;

//1 Jan 2022 = 1640988000
//get whale transactions
router.get("/", (req, res) => {
    request(
        `${url}/transactions?api_key=${key}&min_value=50000000`,
        (response, err, body) => {
            if (err) {
                return res.send(err.body);
            }
            res.send(body);
        }
    );
});

//get recent whale transactions occured in last 10 minutes
router.get("/recent", (req, res) => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - 10);
    let unixTime = Date.parse(date);
    request(
        `${url}/transactions?api_key=${key}&start=${unixTime / 1000}`,
        (response, err, body) => {
            if (err) {
                return res.send(err.body);
            }
            res.send(body);
        }
    );
});

//1641136833000
//1641137159
module.exports = router;
