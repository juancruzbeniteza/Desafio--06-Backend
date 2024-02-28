import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "Productos";

const schema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, default: "https://images.ecestaticos.com/TiO1yDqgoc1kQxPq1ZF-j6x8HEE=/0x0:2272x1469/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ff7b%2Ff92%2Fb0e%2Ff7bf92b0ee991e21c113a78453c0c465.jpg" },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const Product = model(collection, schema);
export default Product;
