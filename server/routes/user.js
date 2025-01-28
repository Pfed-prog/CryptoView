const express = require("express");
const {
  getTransactions,
} = require("../controllers/userTransactionsController.js");

const router = express.Router();

router.get("/:user", getTransactions);

module.exports = router;
