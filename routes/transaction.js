const express = require("express");
const {
  postTransactionHandler,
  getAllTransactionHandler,
  getAllTransactionByUserHandler,
  getTransactionByIdHandler,
  updateTransactionStatusHandler,
} = require("../controllers/TransactionController");
const router = express.Router();

router.get("/", getAllTransactionHandler);
router.get("/user/:id", getAllTransactionByUserHandler);
router.get("/:id", getTransactionByIdHandler);
router.post("/", postTransactionHandler);
router.put("/:id", updateTransactionStatusHandler);

module.exports = router;
