const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

module.exports = {
  postCartHandler: async (req, res) => {
    try {
      const { user, product, amount = 1 } = req.body;

      const cartItem = await CartItem.create({
        product,
        amount,
      });

      const cartExists = await Cart.findOne({ user: user });

      if (!cartExists) {
        const cart = await Cart.create({
          user,
          items: cartItem._id,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Succesfully add user new cart",
          data: cart,
          method: req.method,
        });
      } else {
        await Cart.findOneAndUpdate(
          { user: user },
          {
            $push: { items: cartItem._id },
          }
        );

        const newItem = await CartItem.findById(cartItem._id).populate({
          path: "product",
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
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Succesfully update user cart",
          data: newItem,
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getCartHandler: async (req, res) => {
    try {
      const carts = await Cart.find()
        .populate("user")
        .populate({
          path: "items",
          populate: {
            path: "product",
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
          },
        });

      res.send({
        status: "succes",
        statusCode: res.statusCode,
        message: "Successfully get all cart data",
        data: carts,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getCartByUserHandler: async (req, res) => {
    try {
      const user = req.params.user;
      const cart = await Cart.findOne({ user })
        .populate("user", "name")
        .populate({
          path: "items",
          match: { status: "onCart" },
          populate: {
            path: "product",
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
          },
        });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Success get cart data",
        data: cart,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getCartByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const cart = await Cart.findById(id)
        .populate("user")
        .populate({
          path: "items",
          populate: {
            path: "product",
            model: "Product",
          },
        });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Success get cart data",
        data: cart,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteCartItemsHandler: async (req, res) => {
    try {
      const user = req.params.user;
      const { item } = req.body;

      await Cart.findOneAndUpdate(
        { user },
        {
          $pull: { items: item },
        },
        { new: true }
      );

      await CartItem.findByIdAndDelete(item);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Success remove product from cart",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  incrementCartItemHandler: async (req, res) => {
    try {
      const id = req.params.id;

      await CartItem.findByIdAndUpdate(id, {
        $inc: { amount: 1 },
      });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Success increment item in cart",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  decrementCartItemHandler: async (req, res) => {
    try {
      const id = req.params.id;

      await CartItem.findByIdAndUpdate(id, {
        $inc: { amount: -1 },
      });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Success decrement item in cart",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
};
