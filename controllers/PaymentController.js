const fs = require("fs");
const { rootPath } = require("../config");
const Payment = require("../models/Payment");

module.exports = {
  postPaymentHandler: async (req, res) => {
    try {
      const { name, thumbnail = "" } = req.body;
      const file = req.file;

      if (file) {
        const payment = await Payment.create({
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new payment with thumbnail",
          data: payment,
          method: req.method,
        });
      } else {
        const payment = await Payment.create({
          name,
          thumbnail,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new payment",
          data: payment,
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
  getAllPaymentHandler: async (req, res) => {
    try {
      const payments = await Payment.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get payments data",
        data: payments,
        method: req.method,
      });
    } catch (err) {
      res.code(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getPaymentByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const payment = await Payment.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get selected payment data",
        data: payment,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  putPaymentHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const file = req.file;

      if (file) {
        const { thumbnail } = await Payment.findById(id);

        if (thumbnail) {
          const currentThumbnailPath = `${rootPath}/public/uploads/payments/${thumbnail}`;

          if (fs.existsSync(currentThumbnailPath)) {
            fs.unlinkSync(currentThumbnailPath);
          }
        }

        await Payment.findByIdAndUpdate(id, {
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message:
            "Succesfully update selected payment data with new thumbnail",
          method: req.method,
          data: {
            name,
            thumbnail: file.filename,
          },
        });
      } else {
        await Payment.findByIdAndUpdate(id, { name });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Succesfully update selected payment data",
          method: req.method,
          data: { name },
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "fail",
        message: err.message || "Internal Server Error",
      });
    }
  },
  deletePaymentHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { thumbnail } = await Payment.findById(id);

      if (thumbnail) {
        const currentThumbnailPath = `${rootPath}/public/uploads/payments/${thumbnail}`;

        if (fs.existsSync(currentThumbnailPath)) {
          fs.unlinkSync(currentThumbnailPath);
        }
      }

      await Payment.findByIdAndRemove(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Succesfully remove selected payment data",
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
