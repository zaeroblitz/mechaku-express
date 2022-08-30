const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");

const {
  postCartHandler,
  getCartHandler,
  getCartByUserHandler,
  getCartByIdHandler,
  deleteCartItemsHandler,
  incrementCartItemHandler,
  decrementCartItemHandler,
} = require("../controllers/CartController");

router.post("/", authJwt, postCartHandler);
router.get("/", getCartHandler);
router.get("/user/:user", authJwt, getCartByUserHandler);
router.get("/:id", authJwt, getCartByIdHandler);
router.put("/:user", authJwt, deleteCartItemsHandler);
router.put("/inc/:id", authJwt, incrementCartItemHandler);
router.put("/dec/:id", authJwt, decrementCartItemHandler);

module.exports = router;
