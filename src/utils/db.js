import { connect } from "mongoose"
import env from './env.utils.js'
import logger from "./logger/index.js"

const dbConnection = async () => {
 try {
   await connect(env.LINK_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000 // 45 seconds
  });
    logger.INFO("Database Connected");
 } catch (error) {
   logger.WARN;;(error.message);
 } 
}

export default dbConnection