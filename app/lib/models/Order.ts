import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        inventoryId: String,
        name: String,
        price: Number,
        qty: Number,
        color: String,
        size: String,
      },
    ],
    totalPrice: Number,
    userId: String,
    paymentId: String,
    orderId: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);