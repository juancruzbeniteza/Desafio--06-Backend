import "dotenv/config.js";
import env from '../../src/utils/env.utils.js';
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/factory.js";
const { products, users, orders } = dao;

 const requester = supertest("http://localhost:" + env.PORT + "/api");

describe("Testeando", () => {

  

describe("Testeando sessions", async () => {
    const user = {
      name: "Juan",
      email: "JuanCruz@Juan.com",
      password: "hola1234",
      role: 1,
    };
    let uid;
    let token = {};

  it("Registro de un usuario correctamente", async () => {
      const response = await requester.post("/sessions/register").send(user);
      const { _body} = response;
      uid=_body.payload._id;
      expect(_body.statusCode).to.be.equals(201);
    }); 

    it("Inicio de sesión correctamente", async () => {
      const response = await requester.post("/sessions/login").send(user);
      const { statusCode, headers } = response; 
      token.key = headers["set-cookie"][0].split("=")[0];
      token.value = headers["set-cookie"][0].split("=")[1];
      
      expect(statusCode).to.be.equals(200);
    });

    it("Cerrado de sesión correctamente", async () => {
      const response = await requester.post("/sessions/signout").set("Cookie", [
        token.key + "=" + token.value,
      ]);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    })
 
    it("Eliminación de un usuario correctamente", async () => {
      const response = await requester.delete("/users/" + uid)
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(200);
      
    }); 
  }); 

 describe("Testeando Productos", () => {

  it("Leer todos los productos correctamente", async () => {
    const response = await requester.get("/products");
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

    it("Leer todos los productos correctamente", async () => {
      const response = await requester.get("/products");
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Leer un productos correctamente", async () => {
      const response = await requester.get("/products/" + pid);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Actualizacion de un producto correctamente", async () => {
      const response = await requester.put("/products").send(prod_update);
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    });

    it("Eliminación de un producto correctamente", async () => {
      const response = await requester.delete("/products/" + pid)
      const { statusCode } = response;
      expect(statusCode).to.be.equals(200);
    }); 
  })
 

  describe("Testeando Orders", () => {
  
    const order = {
      pid: "65fb62e32885007afc9a1b9d",
      uid: "65fb60dd2885007afc9a1b93",
      quantity: 30,
      state: 2
    };

    const order_update={
      quantity: 50,
    }

   it("Registro de una orden correctamente", async () => {
    const response = await requester.post("/orders").send(prod);
    const { _body, statusCode } = response;
    pid=_body.payload._id;
    expect(statusCode).to.be.equals(200);
  });

  it("Leer todas las ordenes correctamente", async () => {
    const response = await requester.get("/orders");
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Lee las ordenas de un usuario correctamente", async () => {
    const response = await requester.get("/orders/" + uid);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Actualizacion de un orden correctamente", async () => {
    const response = await requester.put("/orders").send(prod_update);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Retornar el total de la suma de las ordenes de un usuario correctamente", async () => {
    const response = await requester.get("/orders/total/" + uid);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  }); 

  it("Eliminación de una orden correctamente", async () => {
    const response = await requester.delete("/orders/" + oid)
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  }); 

  })  


})