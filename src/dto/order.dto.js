import argsUtil from "../utils/args.utils.js";
import  crypto from 'crypto';

class OrdersDto {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id =crypto.randomBytes(12).toString("hex"))
        this.pid= data.pid,
        this.uid= data.uid,
        this.quantity= data.quantity,
        this.state= data.state,
        argsUtil.env !== "prod" && (this.updatedAt = new Date())
        argsUtil.env !== "prod" && (this.createdAt = new Date())
    }
}

export default OrdersDto