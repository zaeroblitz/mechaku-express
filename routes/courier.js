const express = require("express");
const multer = require("multer");
const path = require("path");
const { rootPath } = require("../config");

const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/couriers"));
  },
  filename: (req, file, cb) => {
    cb(null, "courier-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const {
  postCourierHandler,
  getAllCourierHandler,
  getCourierByIdHandler,
  putCourierHandler,
  deleteCourierHandler,
} = require("../controllers/CourierController");

router.post(
  "/",
  multer({ storage: diskStorage }).single("thumbnail"),
  postCourierHandler
);
router.get("/", getAllCourierHandler);
router.get("/:id", getCourierByIdHandler);
router.put(
  "/:id",
  multer({ storage: diskStorage }).single("thumbnail"),
  putCourierHandler
);
router.delete("/:id", deleteCourierHandler);

module.exports = router;
