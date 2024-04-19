import {socketServer} from "../../server.js"
import products from "../data/mongo/products.mongo.js"
import users from "../data/mongo/users.mongo.js"
import propsProductUtils from "./propsProducts.utils.js";
import propsUserUtils from "./propsUser.utils.js";
import logger from "./logger/index.js";

export default (socket) => {
    
    logger.INFO ("client " + socket.id + " connected");

     async function readProductsAndEmit(socket) {
      try {
          const products = await products.read({});
          socket.emit("products", products);
      } catch (error) {
          logger.WARN(error.message);
      }
    }
    
    readProductsAndEmit(socket);


    socket.on("New Product", async (data) => { 
      try {
        propsProductUtils(data);
        await products.create(data);
        readProductsAndEmit(socket)
      } catch (error) {
        logger.WARN(error.message);
      }
    }); 


    socket.on("New User", async (data) => {
      try {
        propsUserUtils(data);
        await users.create(data);
      } catch (error) {
        logger.WARN(error.message);
      }
    });
  } 

 