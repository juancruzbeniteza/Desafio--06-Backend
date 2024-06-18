import Stripe from 'stripe';
import CheckoutProduct from '../dto/checkout.dto.js';
import CartsManager from '../data/mongo/CartsManager.mongo.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const cart = await CartsManager.readOne({ userId });
    if (!cart || !cart.products.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const productsOnCart = cart.products.map(product => new CheckoutProduct(product));
    const line_items = productsOnCart;
    const mode = 'payment';
    const success_url = 'http://localhost:8080/thanks.html';

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createCheckoutSession };
