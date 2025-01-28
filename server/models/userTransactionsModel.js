const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressTransactionsSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  transactions: {
    type: [
      {
        hash: String,
        timestamp: String,
      },
    ],
    required: true,
  },
  lastHash: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserTransactions", AddressTransactionsSchema);
