import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [String],

    variants: [
      {
        size: { type: String },
        color: { type: String },
        stock: { type: Number, default: 0 }
      }
    ],

    category: { type: String },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;
