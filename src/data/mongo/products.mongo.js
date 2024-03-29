import MongoManager from "./manager.mongo.js";
import Product from "./models/products.models.js";

const products = new MongoManager(Product);


export default products