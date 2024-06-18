import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import crypto from "crypto";

let collection = "users";

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default:"https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, default: 1 , enum:[0,1,2]},
  verified: { type: Boolean, default: false },
  verifiedCode: { type: String, default:crypto.randomBytes(12).toString("base64")}
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;