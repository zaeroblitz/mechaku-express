const fs = require("fs");
const Category = require("../models/Category");
const { rootPath } = require("../config");

module.exports = {
  postCategoryHandler: async (req, res) => {
    try {
      const { name, thumbnail = "" } = req.body;
      const file = req.file;

      if (file) {
        const newCategory = await Category.create({
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new category data with thumbnail",
          data: newCategory,
          method: req.method,
        });
      } else {
        const newCategory = await Category.create({
          name,
          thumbnail,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new category data",
          data: newCategory,
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  getAllCategoryHandler: async (req, res) => {
    try {
      const categories = await Category.find();

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get categories data",
        data: categories,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  getCategoryByIdHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Succesfully get category data",
        data: category,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  putCategoryHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const file = req.file;

      if (file) {
        const { thumbnail } = await Category.findById(id);

        if (thumbnail) {
          const currentThumbnail = `${rootPath}/public/uploads/categories/${thumbnail}`;

          if (fs.existsSync(currentThumbnail)) {
            fs.unlinkSync(currentThumbnail);
          }
        }

        await Category.findByIdAndUpdate(id, {
          name,
          thumbnail: file.filename,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Succesfully update selected category",
          method: req.method,
        });
      } else {
        await Category.findByIdAndUpdate(id, {
          name,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Succesfully update selected category",
          method: req.method,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
  deleteCategoryHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const { thumbnail } = await Category.findById(id);

      if (thumbnail) {
        const currentThumbnail = `${rootPath}/public/uploads/categories/${thumbnail}`;

        if (fs.existsSync(currentThumbnail)) {
          fs.unlinkSync(currentThumbnail);
        }
      }

      await Category.findByIdAndRemove(id);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Succesfully remove selected category",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Internal Server Error" });
    }
  },
};
