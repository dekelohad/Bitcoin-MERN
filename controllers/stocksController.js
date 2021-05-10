const Stock = require('../models/Stock');
require('dotenv').config();
const axios = require('axios');

exports.getAllStocks = async (req, res) => {
  try {
    const key = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=ILS&apikey=${key}`;

    const response = await axios.get(url);
    const data = response.data['Time Series (Digital Currency Daily)'];
    const dataToStoreInDB = Object.entries(data).map((entries) => {
      const [date, priceData] = entries;
      return {
        currentDate: date,
        openILS: priceData['1a. open (ILS)'],
        openUSD: priceData['1b. open (USD)'],
        highILS: priceData['2a. high (ILS)'],
        highUSD: priceData['2b. high (USD)'],
        lowILS: priceData['3a. low (ILS)'],
        lowUSD: priceData['3b. low (USD)'],
        closeILS: priceData['4a. close (ILS)'],
        closeUSD: priceData['4b. close (USD)'],
      };
    });
    const stock = await Stock.create(dataToStoreInDB);
    res.status(200).json({
      success: true,
      data: stock,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStock = async (req, res) => {
  try {
    const { date } = req.query;
    // console.log('date', date);
    const stock = await Stock.findOne({ currentDate: date });
    if (stock) {
      res.status(200).json({
        success: true,
        data: stock,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
