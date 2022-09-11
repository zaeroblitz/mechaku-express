const { rootPath } = require("../config");
const fs = require("fs");
const Courier = require("../models/Courier");

module.exports = {
  postCourierHandler: async (req, res) => {
    try {
      const { name, thumbnail = "" } = req.body;
      const file = req.file;

      if (file) {
        const newCourier = await Courier.create({
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new courier data",
          data: newCourier,
          method: req.method,
        });
      } else {
        const newCourier = await Courier.create({
          name,
          thumbnail,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new courier data",
          data: newCourier,
          method: req.method,
        });
      }
    } catch (err) {
      res.send(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  getAllCourierHandler: async (req, res) => {
    try {
      const couriers = await Courier.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Succesfully get couriers data",
        data: couriers,
        method: req.method,
      });
    } catch (err) {
      res.send(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  getCourierByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const courier = await Courier.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Succesfully get couriers data",
        data: courier,
        method: req.method,
      });
    } catch (err) {
      res.send(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  putCourierHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const file = req.file;

      if (file) {
        const { thumbnail } = await Courier.findById(id);

        if (thumbnail) {
          const currentThumbnailPath = `${rootPath}/public/uploads/couriers/${thumbnail}`;

          if (fs.existsSync(currentThumbnailPath)) {
            fs.unlinkSync(currentThumbnailPath);
          }
        }

        await Courier.findByIdAndUpdate(id, {
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully update courier data with new thumbnail",
          method: req.method,
          data: { name, thumbnail: file.filename },
        });
      } else {
        await Courier.findByIdAndUpdate(id, { name });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully update courier data",
          method: req.method,
          data: { name },
        });
      }
    } catch (err) {
      res.send(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteCourierHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { thumbnail } = await Courier.findById(id);

      if (thumbnail) {
        const currentThumbnailPath = `${rootPath}/public/uploads/couriers/${thumbnail}`;

        if (fs.existsSync(currentThumbnailPath)) {
          fs.unlinkSync(currentThumbnailPath);
        }
      }

      await Courier.findByIdAndRemove(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully delete courier data",
        method: req.method,
      });
    } catch (err) {
      res.send(500).send({
        message: err.message || "Internal Server Error",
      });
    }
  },
};
