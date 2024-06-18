import { Router } from 'express';
import addToCart from '../../controllers/cart.controller.js'
import createCheckoutSession from '../../controllers/payments.controller.js';

const Cartrouter = Router();

router.post('/add', cartController.addToCart);
router.post('/checkout', checkoutController.createCheckoutSession);

export default Cartrouter;
