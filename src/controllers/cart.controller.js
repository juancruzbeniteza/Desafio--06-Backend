import CartsManager from "../data/mongo/CartsManager.mongo.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the cart for the user
    let cart = await CartsManager.readOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = await CartsManager.create({ userId, products: [{ productId, quantity }] });
    } else {
      // If the cart exists, update it
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        // Product exists in cart, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Product does not exist in cart, add it
        cart.products.push({ productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { addToCart };
