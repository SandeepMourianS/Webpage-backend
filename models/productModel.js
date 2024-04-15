const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
    maxLength: [100, "Product name connot exceed 100 characters"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  productid: {
    type: String,
    required: [true, "Please Enter Product description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Please enter Product Stock"],
    maxLength: [20, "Product stock cannot exceed 20"],
  },
  review: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ]
});

let schema = mongoose.model("Product", productSchema);

module.exports = schema;
