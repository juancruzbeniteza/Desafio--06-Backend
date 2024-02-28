import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "Usuarios";

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true, default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fmundo%2Fnoticias-64488076&psig=AOvVaw3RiAqygAhd3D_C_DGldjOs&ust=1708459539934000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIi7mfOZuIQDFQAAAAAdAAAAABAW" },
  email: { type: String, required: true, unique: true },
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;
