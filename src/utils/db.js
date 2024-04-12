import { connect } from "mongoose"
import env from './env.utils.js'

const dbConnection = async () => {
 try {
   await connect(process.env.LINK_MONGO)
   console.log("Database Connected");
 } catch (error) {
   console.log(error);
 } 
}

export default dbConnection