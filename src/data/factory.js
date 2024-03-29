import argsUtil from "../utils/args.utils.js";
import dbConnection from "../utils/db.js"

const environment = argsUtil.env;
let dao={}

switch (environment) {
    case "test":
      console.log("FS  CONNECTED");
      console.log("MODO DEV CONNECTED");
      const { default: ordersFs } = await import("./fs/orders.fs.js")
      const { default: usersFs } = await import("./fs/user.fs.js")
      const { default: productsFs } = await import("./fs/products.fs.js")
      dao = { orders: ordersFs, users: usersFs, products: productsFs}

      /* const { default: productsMemory } = await import("./memory/products.memory.js")
      dao = { products: productsMemory } */
      break;

    case "dev":
      dbConnection()
        .then(() => console.log("MONGO CONNECTED"))
          const { default: productsMongoDev } = await import("./mongo/products.mongo.js")
          const { default: usersMongoDev } = await import("./mongo/users.mongo.js")
          const { default: ordersMongoDev } = await import("./mongo/orders.mongo.js")
          dao = { products: productsMongoDev, users: usersMongoDev, orders: ordersMongoDev }
      break;

      case "prod":
        dbConnection()
        .then(() => console.log("MONGO CONNECTED"))
          const { default: productsMongo } = await import("./mongo/products.mongo.js")
          const { default: usersMongo } = await import("./mongo/users.mongo.js")
          const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
          dao = { products: productsMongo, users: usersMongo, orders: ordersMongo }
        break;
    default:
      
      break;
  }
  
  export default dao;