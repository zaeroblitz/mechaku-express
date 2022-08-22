const express = require("express");
const {
  getAllTransactionStatusHandler,
  getTransactionStatusByIdHandler,
  postTransactionStatusHandler,
  putTransactionStatusHandler,
  deleteTransactionStatusHandler,
} = require("../controllers/TransactionStatusController");
const router = express.Router();

router.get("/", getAllTransactionStatusHandler);
router.get("/:id", getTransactionStatusByIdHandler);
router.post("/", postTransactionStatusHandler);
router.put("/:id", putTransactionStatusHandler);
router.delete("/:id", deleteTransactionStatusHandler);

module.exports = router;
