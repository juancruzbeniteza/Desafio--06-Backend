import CustomRouter from "../CustomRouter.js";
import UsersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import OrdersRouter from "./orders.router.js";
import SessionsRouter from "./sessions.router.js";
import passCb from "../../middlewares/passCb.js";

const order = new OrdersRouter();
const product = new ProductsRouter();
const session = new SessionsRouter();
const user = new UsersRouter();
class ApiRouter extends CustomRouter{
    init(){
        this.router.use("/users",user.getRouter())
        this.router.use("/products",product.getRouter())
        this.router.use("/orders",passCb("jwt"), order.getRouter())
        this.router.use("/sessions",session.getRouter())
    }
}


export default ApiRouter