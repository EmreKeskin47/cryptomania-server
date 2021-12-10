const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

async function runServer() {
    server.use(cors());
    server.use(bodyParser.json());

    //Middleware between endpoints and routes
    server.get("", (req, res) => res.send("Welcome to Cryptomania"));
    server.use("/api/v1/cmc", require("./routes/coinmarketcap"));
    server.use("/api/v1/coinmarketcal", require("./routes/coinmarketcal"));
    server.use("/api/v1/coingecko", require("./routes/coingecko"));
    server.use("/api/v1/feargreed", require("./routes/feargreed"));
    server.use("/api/v1/coindar", require("./routes/coindar"));

    const PORT = process.env.DEFAULT_PORT || 3000;
    server.listen(PORT, "0.0.0.0", (err) => {
        if (err) console.error(err);
        console.log("Server ready on port:", PORT);
    });
}

runServer();
