const express = require("express");
const path = require("path");
const multer = require("multer");
const { rootPath } = require("../config");

const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/products"));
  },
  filename: (req, file, cb) => {
    cb(null, "product-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const {
  postProductHandler,
  getAllProductHandler,
  getProductByIdHander,
  putProductHandler,
  putProductImagesHandler,
  deleteProductHandler,
  deleteProductImagesHandler,
} = require("../controllers/ProductController");

router.get("/", getAllProductHandler);
router.get("/:id", getProductByIdHander);
router.post(
  "/",
  multer({ storage: diskStorage }).array("images"),
  postProductHandler
);
router.put(
  "/:id",
  multer({ storage: diskStorage }).array("images"),
  putProductHandler
);
router.put(
  "/upload/:id",
  multer({ storage: diskStorage }).array("images"),
  putProductImagesHandler
);
router.delete("/upload/:id", deleteProductImagesHandler);
router.delete("/:id", deleteProductHandler);

module.exports = router;
