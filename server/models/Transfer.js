const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transfer", transferSchema);
