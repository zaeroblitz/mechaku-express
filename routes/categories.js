const express = require("express");
const path = require("path");
const multer = require("multer");
const { rootPath } = require("../config");

const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/categories"));
  },
  filename: (req, file, cb) => {
    cb(null, "category-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const {
  getAllCategoryHandler,
  getCategoryByIdHandler,
  postCategoryHandler,
  putCategoryHandler,
  deleteCategoryHandler,
} = require("../controllers/CategoryController");

router.get("/", getAllCategoryHandler);
router.get("/:id", getCategoryByIdHandler);
router.post(
  "/",
  multer({ storage: diskStorage }).single("thumbnail"),
  postCategoryHandler
);
router.put(
  "/:id",
  multer({ storage: diskStorage }).single("thumbnail"),
  putCategoryHandler
);
router.delete("/:id", deleteCategoryHandler);

module.exports = router;
