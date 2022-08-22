const express = require("express");
const multer = require("multer");
const path = require("path");
const { rootPath } = require("../config");
const {
  postUserHandler,
  getAllUserHandler,
  getUserByIdHandler,
  putUserHandler,
  deleteUserHandler,
} = require("../controllers/UserController");

const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/users"));
  },
  filename: (req, file, cb) => {
    cb(null, "user-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

router.get("/", getAllUserHandler);
router.get("/:id", getUserByIdHandler);
router.post(
  "/",
  multer({ storage: diskStorage }).single("avatar"),
  postUserHandler
);
router.put(
  "/:id",
  multer({ storage: diskStorage }).single("avatar"),
  putUserHandler
);
router.delete("/:id", deleteUserHandler);

module.exports = router;
