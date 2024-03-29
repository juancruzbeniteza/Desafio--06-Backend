import CustomRouter from "../CustomRouter.js";
import {create, read, readOne, report, update, destroy} from "../../controllers/orderController.js";

class OrdersRouter extends CustomRouter{
    init(){
        this.post("/", ["USER"], create);
          
        this.get ('/', ["USER"], read);
        
        this.get ('/:uid', ["USER"], readOne)
        
        this.get ('/total/:uid', ["USER"], report)
        
        this.delete('/:oid', ["USER"], destroy)
        
        this.put('/:oid/:quantity/:state', ["USER"], update)
    }
}

export default OrdersRouter