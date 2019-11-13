const mongoose = require('mongoose');
const crypto = require('crypto');
const TransactionSchema = new mongoose.Schema({
  Payee: {
    type: String,
    default: ''
  },
  PaidTo: {
    type: String,
    default: ''
  },
  Amount : {
      type : Number,
      default : 0
  },
  Date_Time : {
    type : Date,
    default : Date.now()
  }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema); 