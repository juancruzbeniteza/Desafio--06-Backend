import paymentService from "../services/paymentsService.js";
import CustomError from "../utils/errors/CustomErrors.js";
import errors from "../utils/errors/errors.js";

class PaymentControler{
    constructor(){
        this.service=paymentService
    }

    checkoutController= async (req, res, next) => {
        try {
            const { _id } = req.user;
            const  response = await this.service.checkoutService(_id);
            if (response){
                return res.json(response);
            }
            CustomError.new(errors.notFound);
        } catch (error) {
            next(error);
        }
    }
}

export default PaymentControler
const  controller = new PaymentControler()
const {checkoutController} = controller
export {checkoutController}