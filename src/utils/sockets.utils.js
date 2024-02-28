import {socketServer} from "../../server.js"
import { ManagerProduct, ManagerUser } from "../data/mongo/manager.mongo.js";
import propsProductUtils from "./ProductProps.js";
import propsUserUtils from "./UserProps.js";

export default (socket) => {
    
    console.log("client " + socket.id + " connected");

     async function readProductsAndEmit(socket) {
      try {
          const products = await ManagerProduct.read({});
          socket.emit("products", products);
      } catch (error) {
          console.log(error);
      }
    }
    
    readProductsAndEmit(socket);


    socket.on("Nuevo Producto", async (data) => { 
      try {
        propsProductUtils(data);
        await ManagerProduct.create(data);
        readProductsAndEmit(socket)
      } catch (error) {
        console.log(error);
      }
    }); 


    socket.on("Nuevo usuario", async (data) => {
      try {
        propsUserUtils(data);
        await ManagerUser.create(data);
      } catch (error) {
        console.log(error);
      }
    });
  } 

