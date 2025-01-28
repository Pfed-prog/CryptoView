const AddressTransactionsModel = require("../models/userTransactionsModel.js");
const evmexplorer = require("@evmexplorer/blockscout");

const getTransactions = async (req, res) => {
  const { user } = req.params;

  const data = await evmexplorer.fetchAddressTransactions(user);

  let transactions = [];
  if (data.items) {
    for (let i = 5; i > 0; i--) {
      transactions.push({
        hash: data.items[i].hash,
        timestamp: data.items[i].timestamp,
      });
    }
  }

  const lastHash = data.items[0].hash;

  const abc = await AddressTransactionsModel.find({
    lastHash: lastHash,
  }).exec();

  if (abc.length === 0) {
    try {
      const workout = await AddressTransactionsModel.create({
        user: user,
        transactions: transactions,
        lastHash: lastHash,
      });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  getTransactions,
};
