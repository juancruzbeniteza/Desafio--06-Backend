import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "orders";

const schema = new Schema({
  pid: { type: Types.ObjectId, required: true, ref: "products"},
  uid: { type: Types.ObjectId, required: true,ref: "users" },
  quantity: { type: Number, required: true },
  state: { type: Number, required: true },
  
},{timestamps:true});

schema.pre("find", function () {
  this.populate("uid", "-createdAt -updatedAt -__v");
});
schema.pre("find", function () {
  this.populate("pid", "-createdAt -updatedAt -__v");
});

schema.plugin(mongoosePaginate)
const Order = model(collection, schema);
export default Order;