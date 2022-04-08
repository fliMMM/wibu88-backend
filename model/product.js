const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String },
    image: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: Array, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
