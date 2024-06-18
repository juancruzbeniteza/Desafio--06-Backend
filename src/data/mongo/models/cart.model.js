import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
}, { timestamps: true });

CartSchema.plugin(mongoosePaginate);

const CartModel = model(collection, CartSchema);

export default CartModel;
