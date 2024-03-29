import fs from "fs";
import crypto from "crypto";

class OrdersManager {
  static #orders = [];

  constructor() {
    this.path = "./src/data/fs/files/orders.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    const exist = fs.existsSync(this.path);
    if (exist) {
      OrdersManager.#orders = JSON.parse(fs.readFileSync(this.path, this.conf));
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  create(data) {
    try {
      
      OrdersManager.#orders.push(data);

      fs.writeFileSync(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2)
      );
      return data._id;
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      if (OrdersManager.#orders.length === 0) {
        throw new Error("No se encontraron ordenes de compra!");
      } else {
        return OrdersManager.#orders;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(uid) {
    try {
      const order = OrdersManager.#orders.filter((orders) => orders.uid === uid);
      if (!order) {
        throw new Error("No se encontro orden del usuario!");
      } else {
        return order;
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(oid) {
    try {
      const order = OrdersManager.#orders.find((order) => order._id === oid);
      if (!order) {
        throw new Error("No se encontro orden!");
      } else {
        const index = OrdersManager.#orders.indexOf(order);
        OrdersManager.#orders.splice(index, 1);
        fs.writeFileSync(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2)
        );
        return order;
      }
    } catch (error) {
      throw error;
    }
  }

  update(oid,quantity,state) {
    try {
      const one = OrdersManager.#orders.find((order) => order.id === oid)
      if(!one){
        throw new Error("No se encontro orden!")
      }else{

        one.quantity = quantity;
        one.state = state
        fs.writeFileSync(
          this.path,
          JSON.stringify(OrdersManager.#orders, null, 2)
        );
        return one
      }
      

    } catch (error) {
      throw error;
    }
  }
}

const ManagerOrders = new OrdersManager();
export default ManagerOrders;