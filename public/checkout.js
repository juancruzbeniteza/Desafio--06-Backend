import CheckoutProduct from "../data/dto/checkout.dto.js";
import cartsManager from "../data/mongo/CartsManager.mongo.js";

class CheckoutDAO{
  async getProductsOnCart(filter) {
    try {
      let productsOnCart = await cartsManager.read(filter);
      return productsOnCart.map((each) => new CheckoutProduct(each));
    } catch (error) {
      console.error('Error fetching products on cart:', error);
      throw error;
    }
  }
}


