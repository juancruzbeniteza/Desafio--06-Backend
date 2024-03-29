import MongoManager from "./manager.mongo.js";
import User from "./models/users.models.js";

const users = new MongoManager(User);

export default users