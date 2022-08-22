const express = require("express");
const path = require("path");
const multer = require("multer");
const { rootPath } = require("../config");

const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/grades"));
  },
  filename: (req, file, cb) => {
    cb(null, "grade-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const {
  getAllGradeHandler,
  getGradeByIdHandler,
  postGradeHandler,
  putGradeHandler,
  deleteGradeHandler,
} = require("../controllers/GradeController");

router.get("/", getAllGradeHandler);
router.get("/:id", getGradeByIdHandler);
router.post(
  "/",
  multer({ storage: diskStorage }).single("thumbnail"),
  postGradeHandler
);
router.put(
  "/:id",
  multer({ storage: diskStorage }).single("thumbnail"),
  putGradeHandler
);
router.delete("/:id", deleteGradeHandler);

module.exports = router;
