const fs = require("fs");

const writeToBinance = (name) => {
    name = name + " ";
    fs.readFile("./market-pairs/Binance.txt", function (err, data) {
        if (err) throw err;
        if (data.includes(name)) {
            return;
        }
        fs.appendFile("./market-pairs/Binance.txt", name, (err) => {
            if (err) throw err;
        });
    });
};

const writeToGate = (name) => {
    name = name + " ";
    fs.readFile("./market-pairs/Gate.txt", function (err, data) {
        if (err) throw err;
        if (data.includes(name)) {
            return;
        }
        fs.appendFile("./market-pairs/Gate.txt", name, (err) => {
            if (err) throw err;
            console.log("Gate.txt is updated");
        });
    });
};

const checkIfExistsInBinanceGate = (name) => {
    var dataBinance = fs.readFileSync("./market-pairs/Binance.txt");
    let binance = dataBinance.includes(name + " ");
    var dataGate = fs.readFileSync("./market-pairs/Gate.txt");
    let gate = dataGate.includes(name + " ");
    return { gate, binance };
};

module.exports = {
    writeToBinance,
    writeToGate,
    checkIfExistsInBinanceGate,
};
