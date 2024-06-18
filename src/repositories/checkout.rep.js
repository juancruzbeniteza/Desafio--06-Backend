import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutRepository = async (filter) => {
  try {
    const productsOnCart = await checkoutDAO.getProductsOnCart(filter);
    console.log(productsOnCart);
    
    const line_items = productsOnCart.map(product => ({
      price_data: {
        currency: 'usd', // specify your currency
        product_data: {
          name: product.price_data.product_data.name,
        },
        unit_amount: product.price_data.unit_amount, // price in cents
      },
      quantity: product.quantity,
    }));

    const mode = "payment";
    const success_url = "http://localhost:8080/thanks.html";
    const cancel_url = "http://localhost:8080/cancel.html";
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode,
      success_url,
      cancel_url
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export default checkoutRepository;
