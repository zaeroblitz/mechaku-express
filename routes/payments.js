const express = require("express");
const path = require("path");
const { rootPath } = require("../config");
const multer = require("multer");
const {
  postPaymentHandler,
  getAllPaymentHandler,
  getPaymentByIdHandler,
  putPaymentHandler,
  deletePaymentHandler,
} = require("../controllers/PaymentController");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(rootPath, "/public/uploads/payments"));
  },
  filename: (req, file, cb) => {
    cb(null, "payment-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});
const router = express.Router();

router.get("/", getAllPaymentHandler);
router.get("/:id", getPaymentByIdHandler);
router.post(
  "/",
  multer({ storage: diskStorage }).single("thumbnail"),
  postPaymentHandler
);
router.put(
  "/:id",
  multer({ storage: diskStorage }).single("thumbnail"),
  putPaymentHandler
);
router.delete("/:id", deletePaymentHandler);

module.exports = router;
