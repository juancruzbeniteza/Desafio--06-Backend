import argsUtil from "../utils/args.utils.js";
import  crypto from 'crypto';
import { createHash } from "../utils/hash.utils.js";

class UsersDto {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id =crypto.randomBytes(12).toString("hex"))
        this.name= data.name,
        this.photo= data.photo || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Ffree-png-dxldr&psig=AOvVaw1B7ZklWRlKCF1dvQNZoGlk&ust=1711823994857000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMi3isOPmoUDFQAAAAAdAAAAABAE",
        this.email= data.email,
        this.role= data.role || 1,
        this.password= createHash(data.password),
        this.email= data.email,
        this.verified = data.verified || false,
        this.verifiedCode = crypto.randomBytes(12).toString("base64"),
        argsUtil.env !== "prod" && (this.updatedAt = new Date()),
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default UsersDto