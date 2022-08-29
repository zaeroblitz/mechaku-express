const fs = require("fs");
const { rootPath } = require("../config");
const Product = require("../models/Product");
const ProductDetail = require("../models/ProductDetail");

module.exports = {
  postProductHandler: async (req, res) => {
    try {
      const {
        name,
        category,
        brand,
        grade,
        description,
        price,
        quantity,
        sold = 0,
      } = req.body;

      const files = req.files;

      if (files) {
        const productDetail = await ProductDetail.create({
          description,
          price,
          quantity,
          sold,
        });

        files.forEach(async (file) => {
          await ProductDetail.findByIdAndUpdate(productDetail._id, {
            $push: { images: file.filename },
          });
        });

        const product = await Product.create({
          name,
          category,
          brand,
          grade,
          details: productDetail._id,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfullly add new product with images",
          data: product,
          method: req.method,
        });
      } else {
        const productDetail = await ProductDetail.create({
          description,
          price,
          quantity,
          sold,
        });

        const product = await Product.create({
          name,
          category,
          brand,
          grade,
          details: productDetail._id,
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new product",
          data: product,
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
  getAllProductHandler: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("category", "name thumbnail")
        .populate("brand", "name thumbnail")
        .populate("grade", "name thumbnail")
        .populate("details");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get products data",
        data: products,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  getProductByIdHander: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id)
        .populate("category", "name thumbnail")
        .populate("brand", "name thumbnail")
        .populate("grade", "name thumbnail")
        .populate("details");

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully get selected prodcut data",
        data: product,
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  putProductHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        category,
        brand,
        grade,
        description,
        price,
        quantity,
        sold,
      } = req.body;

      const product = await Product.findByIdAndUpdate(id, {
        name,
        category,
        brand,
        grade,
      });

      await ProductDetail.findByIdAndUpdate(product.details, {
        description,
        price,
        quantity,
        sold,
      });

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully update selected product data",
        method: req.method,
      });
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  putProductImagesHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const files = req.files;

      if (files) {
        files.forEach(async (file) => {
          await ProductDetail.findByIdAndUpdate(id, {
            $push: { images: file.filename },
          });
        });

        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully add new product images",
          method: req.method,
        });
      } else {
        res.send({
          status: "failed",
          message: "Empty Images",
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteProductImagesHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const url = req.query.url;

      if (url) {
        const currentImagePath = `${rootPath}/public/uploads/products/${url}`;

        if (fs.existsSync(currentImagePath)) {
          fs.unlinkSync(currentImagePath);
        }

        await ProductDetail.findByIdAndUpdate(id, {
          $pull: { images: url },
        });
        res.send({
          status: "success",
          statusCode: res.statusCode,
          message: "Successfully remove selected product image",
          method: req.method,
        });
      } else {
        res.send({
          status: "failed",
          message: "No image to delete",
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "failed",
        message: err.message || "Internal Server Error",
      });
    }
  },
  deleteProductHandler: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      const productDetails = await ProductDetail.findById(product.details._id);

      if (productDetails.images) {
        productDetails.images.forEach((image) => {
          const currentThumbnail = `${rootPath}/public/uploads/products/${image}`;

          if (fs.existsSync(currentThumbnail)) {
            fs.unlinkSync(currentThumbnail);
          }
        });
      }

      await Product.findByIdAndRemove(id);
      await ProductDetail.findByIdAndRemove(product.details);

      res.send({
        status: "success",
        statusCode: res.statusCode,
        message: "Successfully delete selected product data",
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
