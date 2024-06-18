import "dotenv/config.js";

import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

// describe("AUTH TEST", () => {
//     const userData = {
//         email: "arnotomas1@gmail.com",
//         name: "Tomás",
//         role: 2,
//         password: "tomas123",
//     };

//     let token;

//     it("Registro de un usuario", async () => {
//         const response = await requester.post("/sessions/register").send(userData);
//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(201);
//     });
//     it("Inicio de sesión", async () => {
//         const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
//         const { _body, headers } = response;

//         token = `${headers["set-cookie"][0]?.split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

//         expect(_body.statusCode).to.be.equals(200);
//     });
//     it("Cerrado de sesión", async () => {
//         const response = await requester.post("/sessions/signout").set("Cookie", [token]);
//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });
//     it("Eliminación de un usuario", async () => {
//         const searchedUser = await requester.get(`/users?email=${userData.email}`).set("Cookie", [token]);

//         const [user] = searchedUser._body.response.docs

//         const response = await requester.delete("/users/" + user._id).set("Cookie", [token]);

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });
// });

describe("PRODUCTS TEST", () => {
    const userData = {
        email: "arnotomas1@gmail.com",
        password: "tomas123",
    };

    const productData = {
        title: "Heladera Samsung",
        price: 100000,
        stock: 20
    };

    let token;

    it("Inicio de sesión", async () => {
        const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
        const { _body, headers } = response;

        token = `${headers["set-cookie"][0]?.split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Creación de producto", async () => {
        const response = await requester.post("/products/").send(productData).set("Cookie", [token]);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(201);
    });

    it("Obtener todos los productos", async () => {
        const response = await requester.get(`/products`)

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Obtener un producto", async () => {
        const productsResponse = await requester.get(`/products`)
        const { response: products } = productsResponse._body

        const productId = products?.docs[0]._id

        const response = await requester.get(`/products/${productId}`)

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Modificar producto", async () => {
        const productsResponse = await requester.get(`/products`)
        const { response: products } = productsResponse._body

        const productId = products?.docs[0]._id

        const response = await requester.put(`/products/${productId}`).send({ stock: 1000 }).set("Cookie", [token]);

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Eliminar producto", async () => {
        const productsResponse = await requester.get(`/products`)
        const { response: products } = productsResponse._body

        const productId = products?.docs[0]._id

        const response = await requester.delete(`/products/${productId}`).set("Cookie", [token]);

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });

});
