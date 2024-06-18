import Stripe from "stripe"
import PaymentsDto from "../dto/payments.dto.js";
import env from "../utils/env.utils.js";
import dao from "../data/factory.js"

const {orders}=dao

const stripe = new Stripe(env.STRIPE_KEY)
class PaymentRep {
    constructor() {
        this.model = orders
    }

    checkoutRepository=async (id)=>{
        try {
            const filter={}
            filter.uid=id
            let cart = await this.model.read({filter})
            console.log(cart);
            cart = cart.docs.map( (each) => new PaymentsDto(each))
            const line_items = cart
            const mode = "payment"
            const success_url = "http://localhost:8080/Thanks.html"
            const intent= await stripe.checkout.sessions.create({
                line_items, mode, success_url})
            return intent
        } catch (error) {
            throw error
        }
    }
}
const repository = new PaymentRep();
export default repository;