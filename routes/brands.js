const express = require("express");
const path = require("path");
const multer = require("multer");
const { rootPath } = require("../config");

const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/brands"));
  },
  filename: function (req, file, cb) {
    cb(null, "brand-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const {
  postBrandHandler,
  getAllBrandHandler,
  getBrandByIdHandler,
  putBrandHandler,
  deleteBrandHandler,
} = require("../controllers/BrandController");

router.get("/", getAllBrandHandler);
router.get("/:id", getBrandByIdHandler);
router.post(
  "/",
  multer({ storage: diskStorage }).single("thumbnail"),
  postBrandHandler
);
router.put(
  "/:id",
  multer({ storage: diskStorage }).single("thumbnail"),
  putBrandHandler
);
router.delete("/:id", deleteBrandHandler);

module.exports = router;
