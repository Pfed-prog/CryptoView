const nftModel = require("../models/nftModel.js");

const getNft = async (req, res) => {
  const { contract, id } = req.params;

  const data = await fetch(
    `https://eth.blockscout.com/api/v2/tokens/${contract}/instances/${id}`
  );

  const jsonData = await data.json();

  const name = jsonData.token.name;
  const symbol = jsonData.token.symbol;
  const imageUrl = jsonData.metadata.image;
  const attributes = jsonData.metadata.attributes;

  const abc = await nftModel
    .find({
      name: name,
      imageUrl: imageUrl,
      contract: contract,
      tokenId: id,
    })
    .exec();

  if (abc.length === 0) {
    try {
      const workout = await nftModel.create({
        name: name,
        imageUrl: imageUrl,
        contract: contract,
        tokenId: id,
        symbol: symbol,
        attributes: attributes,
      });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  getNft,
};
