import MongoManager from "./manager.mongo.js";
import Order from './models/orders.models.js';

const orders = new MongoManager(Order);

export default orders