import {socketServer} from "../../server.js"
//import ManagerProduct from "../data/fs/products.fs.js"
import products from "../data/mongo/products.mongo.js"
import users from "../data/mongo/users.mongo.js"
import propsProductUtils from "./propsProducts.utils.js";
import propsUserUtils from "./propsUser.utils.js";

export default (socket) => {
    
    console.log("client " + socket.id + " connected");

     async function readProductsAndEmit(socket) {
      try {
          const products = await products.read({});
          socket.emit("products", products);
      } catch (error) {
          console.log(error);
      }
    }
    
    readProductsAndEmit(socket);


    socket.on("new product", async (data) => { 
      try {
        propsProductUtils(data);
        await products.create(data);
        readProductsAndEmit(socket)
      } catch (error) {
        console.log(error);
      }
    }); 


    socket.on("new User", async (data) => {
      try {
        propsUserUtils(data);
        await users.create(data);
      } catch (error) {
        console.log(error);
      }
    });
  } 

 