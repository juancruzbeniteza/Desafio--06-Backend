import CustomRouter from "../CustomRouter.js";
import {create, read, readOne, report, update, destroy} from "../../controllers/orderController.js";

class OrdersRouter extends CustomRouter{
    init(){
        this.post("/", ["USER", "ADMIN"], create);

        this.get ('/', ["PUBLIC"], read);
        
        this.get ('/:uid', ["PUBLIC"], readOne)
        
        this.get ('/total/:uid', ["USER"], report)
        
        this.delete('/:oid', ["USER"], destroy)
        
        this.put('/:oid/:quantity/:state', ["USER"], update)
    }
}

export default OrdersRouter