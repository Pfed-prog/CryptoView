const mongoose = require("mongoose");
const { Schema } = mongoose;

const NFTSchema = new Schema({
  contract: {
    type: String,
    required: true,
  },
  tokenId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  attributes: {
    type: [{ trait_type: String, value: String }],
  },
});

module.exports = mongoose.model("NFTs", NFTSchema);
