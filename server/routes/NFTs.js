const express = require("express");
const { getNft } = require("../controllers/nftController.js");

const router = express.Router();

router.get("/:contract/:id", getNft);

module.exports = router;
