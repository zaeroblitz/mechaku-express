const fs = require("fs");
const Brand = require("../models/Brand");
const { rootPath } = require("../config");

module.exports = {
  postBrandHandler: async (req, res) => {
    try {
      const { name, thumbnail = "" } = req.body;
      const file = req.file;

      if (file) {
        const brand = await Brand.create({
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully get brands data with thumbnail",
          data: brand,
          method: req.method,
          url: req.url,
        });
      } else {
        const brand = await Brand.create({
          name,
          thumbnail,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully get brands data",
          data: brand,
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  getAllBrandHandler: async (req, res) => {
    try {
      const brands = await Brand.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get brands data",
        data: brands,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  getBrandByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const brand = await Brand.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get brand data",
        data: brand,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  putBrandHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const file = req.file;

      if (file) {
        const { thumbnail } = await Brand.findById(id, "thumbnail");

        if (thumbnail) {
          const currentThumbnail = `${rootPath}/public/uploads/brands/${thumbnail}`;

          if (fs.existsSync(currentThumbnail)) {
            fs.unlinkSync(currentThumbnail);
          }
        }

        await Brand.findByIdAndUpdate(id, {
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully update brand data with new thumbnail",
          method: req.method,
        });
      } else {
        await Brand.findByIdAndUpdate(id, { name });
        res.send({
          status: "success",
          message: "Successfully update brand data",
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  deleteBrandHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { thumbnail } = await Brand.findById(id);

      if (thumbnail) {
        const currentThumbnail = `${rootPath}/public/uploads/brands/${thumbnail}`;

        if (fs.existsSync(currentThumbnail)) {
          fs.unlinkSync(currentThumbnail);
        }
      }

      await Brand.findByIdAndRemove(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully remove selected brand",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
};
