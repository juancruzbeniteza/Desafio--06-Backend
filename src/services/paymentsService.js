import repository from "../repositories/payments.rep.js";
class PaymentsService{
    constructor(){
        this.repository=repository
    }
    checkoutService=async (id)=>{
        try {
            const response= await this.repository.checkoutRepository(id);
            return response
        } catch (error) {
            throw error
        }
    }
}

const paymentService = new PaymentsService()
export default paymentService