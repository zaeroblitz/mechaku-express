const fs = require("fs");
const { rootPath } = require("../config");
const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const { findById } = require("../models/User");

module.exports = {
  postUserHandler: async (req, res) => {
    try {
      const file = req.file;
      const {
        name,
        email,
        password,
        avatar = "",
        role = "USER",
        phone_number = "",
        wishlists = [],
      } = req.body;

      if (file) {
        const user = await User.create({
          name,
          email,
          password,
          avatar: file.filename,
          role,
          phone_number,
          wishlists,
        });

        await Cart.create({
          user: user._id,
          items: [],
        })

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new user with avatar",
          data: user,
          method: req.method,
        });
      } else {
        const user = await User.create({
          name,
          email,
          password,
          avatar,
          role,
          phone_number,
          wishlists,
        });

        await Cart.create({
          user: user._id,
          items: [],
        })

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new user",
          data: user,
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllUserHandler: async (req, res) => {
    try {
      const users = await User.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get all users data",
        data: users,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getUserByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get selected user data",
        data: user,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  putUserHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const file = req.file;
      const { name, password, phone_number } = req.body;

      if (file) {
        const { avatar } = await User.findById(id);
        if (avatar) {
          const currentThumbnailPath = `${rootPath}/public/uploads/users/${avatar}`;

          if (fs.existsSync(currentThumbnailPath)) {
            fs.unlinkSync(currentThumbnailPath);
          }
        }

        if (password) {
          const hashedPassword = bcrypt.hashSync(password, 10);

          await User.findByIdAndUpdate(id, {
            name,
            password: hashedPassword,
            avatar: file.filename,
            phone_number,
          });

          res.send({
            status: "success",
            statusCode: res.statusCode,
            message:
              "Successfully update selected user data with new avatar & password",
            method: req.method,
            data: { name, phone_number, avatar: file.filename },
          });
        } else {
          await User.findByIdAndUpdate(id, {
            name,
            avatar: file.filename,
            phone_number,
          });

          res.send({
            status: "success",
            statusCode: res.statusCode,
            message: "Successfully update selected user data with new avatar",
            method: req.method,
            data: { name, phone_number, avatar: file.filename },
          });
        }
      } else {
        if (password) {
          const hashedPassword = bcrypt.hashSync(password, 10);

          await User.findByIdAndUpdate(id, {
            name,
            password: hashedPassword,
            phone_number,
          });

          res.send({
            status: "success",
            statusCode: res.statusCode,
            message: "Successfully update selected user data with new password",
            method: req.method,
            data: { name, phone_number },
          });
        } else {
          await User.findByIdAndUpdate(id, {
            name,
            phone_number,
          });

          res.send({
            status: "success",
            statusCode: res.statusCode,
            message: "Successfully update selected user data",
            data: { name, phone_number },
            method: req.method,
          });
        }
      }
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteUserHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { avatar } = await User.findById(id);

      if (avatar) {
        const currentThumbnailPath = `${rootPath}/public/uploads/users/${avatar}`;

        if (fs.existsSync(currentThumbnailPath)) {
          fs.unlinkSync(currentThumbnailPath);
        }
      }

      await User.findByIdAndRemove(id);

      res.send({
        tatus: "success",
        statusCode: res.statusCode,
        message: "Successfully remove selected user data",
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
