import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "users";

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default:"https://cdn-icons-png.flaticon.com/512/74/74472.png" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, default: 1 , enum:[0,1,2]},
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;
