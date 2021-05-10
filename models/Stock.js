const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  currentDate: {
    type: Date,
  },
  openILS: {
    type: Number,
  },
  openUSD: {
    type: Number,
  },

  highILS: {
    type: Number,
  },

  highUSD: {
    type: Number,
  },

  lowILS: {
    type: Number,
  },

  lowUSD: {
    type: Number,
  },

  closeILS: {
    type: Number,
  },
  closeUSD: {
    type: Number,
  },
});

module.exports = mongoose.model('Stock', StockSchema);
