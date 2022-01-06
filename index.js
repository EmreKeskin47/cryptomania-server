const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

async function runServer() {
    server.use(cors());
    server.use(bodyParser.json());
    server.set("port", process.env.PORT || 3000);

    //Middleware between endpoints and routes
    server.use("/api/v1/cmc", require("./routes/coinmarketcap"));
    server.use("/api/v1/coinmarketcal", require("./routes/coinmarketcal"));
    server.use("/api/v1/coingecko", require("./routes/coingecko"));
    server.use("/api/v1/feargreed", require("./routes/feargreed"));
    server.use("/api/v1/coindar", require("./routes/coindar"));
    server.use("/api/v1/whalealert", require("./routes/whalealert"));
    server.use("/api/v1/binance", require("./routes/binance"));
    server.use("/api/v1/finnhub", require("./routes/finnhub"));

    server
        .get("/", (req, res) => res.send("Welcome to Cryptomania"))
        .listen(server.get("port"), function () {
            console.log(
                "App is running, server is listening on port ",
                server.get("port")
            );
        });
}

runServer();
