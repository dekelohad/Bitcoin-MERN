const express = require('express');
const {
  getAllStocks,
  getStock,
} = require('../../controllers/stocksController');

const router = express.Router();

router.get('/', getAllStocks);
router.get('/stock', getStock);

module.exports = router;
