import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "Ordenes";

const schema = new Schema({
  pid: { type: Types.ObjectId, required: true, ref: "Productos"},
  uid: { type: Types.ObjectId, required: true,ref: "Usuarios" },
  quantity: { type: Number, required: true },
  state: { type: Number, required: true },
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const Order = model(collection, schema);
export default Order;