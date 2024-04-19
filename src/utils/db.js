import { connect } from "mongoose"
import env from './env.utils.js'
import logger from "./logger/index.js"

const dbConnection = async () => {
 try {
   await connect(env.LINK_MONGO)
   logger.INFO("Database Connected");
 } catch (error) {
   logger.WARN;;(error.message);
 } 
}

export default dbConnection