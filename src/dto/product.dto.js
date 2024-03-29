import argsUtil from "../utils/args.utils.js";
import  crypto from 'crypto';

class ProductsDto {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id =crypto.randomBytes(12).toString("hex"))
        this.title= data.title,
        this.photo= data.photo || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.samsung.com%2Fus%2Fsupport%2Fanswer%2FANS00089142%2F&psig=AOvVaw3TnEUsdaAGCYYh0gmORFcG&ust=1711826288729000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJj_-4qYmoUDFQAAAAAdAAAAABAE",
        this.price= data.price,
        this.stock= data.stock
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default ProductsDto