const express = require("express");
const {
  postTransactionHandler,
  getAllTransactionHandler,
  getAllTransactionByUserHandler,
  getTransactionByIdHandler,
} = require("../controllers/TransactionController");
const router = express.Router();

router.get("/", getAllTransactionHandler);
router.get("/", getAllTransactionByUserHandler);
router.get("/:id", getTransactionByIdHandler);
router.post("/", postTransactionHandler);

module.exports = router;
