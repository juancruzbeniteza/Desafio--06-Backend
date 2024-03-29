import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import crypto from "crypto";

let collection = "users";

const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Ffree-png-dxldr&psig=AOvVaw1B7ZklWRlKCF1dvQNZoGlk&ust=1711823994857000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi3isOPmoUDFQAAAAAdAAAAABAE" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: Number, default: 1 , enum:[0,1,2]},
  verified: { type: Boolean, default: false },
  verifiedCode: { type: String, default:crypto.randomBytes(12).toString("base64")}
  
},{timestamps:true});

schema.plugin(mongoosePaginate)
const User = model(collection, schema);
export default User;