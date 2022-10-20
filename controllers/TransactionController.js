const User = require("../models/User");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const ProductDetail = require("../models/ProductDetail");
const Transaction = require("../models/Transaction");
const TransactionStatus = require("../models/TransactionStatus");

module.exports = {
  postTransactionHandler: async (req, res) => {
    try {
      const {
        user,
        address,
        cartItems,
        products,
        courier,
        payment,
        value,
        tax,
        transactionStatus = "630307b53b0356668342357d",
      } = req.body;

      const transaction = await Transaction.create({
        user,
        address,
        cartItems,
        products,
        courier,
        payment,
        value,
        tax,
        transactionStatus,
      });

      const transactionExists = await Transaction.findById(transaction._id);

      if (transactionExists) {
        cartItems.forEach(async (cart, index) => {
          const item = await CartItem.findOneAndUpdate(
            {
              id: cart,
              product: products[index],
            },
            {
              status: "transaction-pending",
            }
          );

          const itemAmount = item.amount;
          const minusItemAmount = -Math.abs(itemAmount);
          const { details } = await Product.findById(
            products[index],
            "details"
          );
          await ProductDetail.findByIdAndUpdate(details, {
            $inc: { quantity: minusItemAmount, sold: itemAmount },
          });
        });
      }

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully add new transaction",
        data: transaction,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  updateTransactionStatusHandler: async (req, res) => {
    try {
      const { id } = req.params;
      const { transactionStatus } = req.body;

      console.log(transactionStatus);

      const transaction = await Transaction.findByIdAndUpdate(id, { transactionStatus });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully update transaction status",
        method: req.method,
        data: transaction,
      });

    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllTransactionHandler: async (req, res) => {
    try {
      const transactions = await Transaction.find()
        .populate("user")
        .populate({
          path: "cartItems",
          model: "Cart_Item",
        })
        .populate({
          path: "products",
          model: "Product",
          populate: [
            {
              path: "brand",
              model: "Brand",
            },
            {
              path: "category",
              model: "Category",
            },
            {
              path: "details",
              model: "Product_Detail",
            },
            {
              path: "grade",
              model: "Grade",
            },
          ],
        })
        .populate("courier")
        .populate("payment")
        .populate("transactionStatus");

        console.log(transactions);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get all transaction",
        data: transactions,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllTransactionByUserHandler: async (req, res) => {
    try {
      const userId = req.params.id;

      const transactions = await Transaction.find({
        user: userId,
      })
        .populate("user")
        .populate({
          path: "cartItems",
          model: "Cart_Item",
        })
        .populate({
          path: "products",
          model: "Product",
          populate: [
            {
              path: "brand",
              model: "Brand",
            },
            {
              path: "category",
              model: "Category",
            },
            {
              path: "details",
              model: "Product_Detail",
            },
            {
              path: "grade",
              model: "Grade",
            },
          ],
        })
        .populate("courier")
        .populate("payment")
        .populate("transactionStatus");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get all transaction by user",
        data: transactions,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getTransactionByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;

      const transaction = await Transaction.findById(id)
        .populate("user")
        .populate({
          path: "cartItems",
          model: "Cart_Item",
        })
        .populate({
          path: "products",
          model: "Product",
          populate: [
            {
              path: "brand",
              model: "Brand",
            },
            {
              path: "category",
              model: "Category",
            },
            {
              path: "details",
              model: "Product_Detail",
            },
            {
              path: "grade",
              model: "Grade",
            },
          ],
        })
        .populate("courier")
        .populate("payment")
        .populate("transactionStatus");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get selected transaction by id",
        data: transaction,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
};
