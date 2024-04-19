import {faker} from "@faker-js/faker"
import repository from './../../repositories/products.rep';
import logger from "../../utils/logger/index.js"


function productMock() {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ min: 0, max: 200 }),
       };
}

async function createProducts() {
    try {
        for (let i = 0; i < 200; i++) {
            await repository.create(productMock());
        }
    } catch (error) {
        logger.WARN(error.message);
    }
}

createProducts()