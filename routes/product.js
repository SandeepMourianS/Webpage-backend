const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReiew,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      //cb- callback
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

//review
router.route("/review").put(isAuthenticateUser, createReview);

//Admin routes
router
  .route("/admin/product/new")
  .post(
    isAuthenticateUser,
    authorizeRoles("admin"),
    upload.array("images"),
    newProduct
  );
router
  .route("/admin/products")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/admin/product/:id")
  .put(
    isAuthenticateUser,
    authorizeRoles("admin"),
    upload.array("images"),
    updateProduct
  );
router
  .route("/admin/reviews")
  .get(isAuthenticateUser, authorizeRoles("admin"), getReviews);
router
  .route("/admin/review")
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteReiew);

module.exports = router;
