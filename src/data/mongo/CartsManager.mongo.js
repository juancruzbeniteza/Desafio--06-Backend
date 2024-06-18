import CartModel from './models/cart.model.js';

class CartsManager {
  async read(filter) {
    try {
      const cartItems = await CartModel.find(filter).populate('productId');
      return cartItems.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      }));
    } catch (error) {
      console.error('Error reading cart items:', error);
      throw error;
    }
  }
}

export default new CartsManager();
