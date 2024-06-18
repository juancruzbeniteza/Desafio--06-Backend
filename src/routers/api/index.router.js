import CustomRouter from "../CustomRouter.js";
import UsersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import OrdersRouter from "./orders.router.js";
import SessionsRouter from "./sessions.router.js";
import PaymentsRouter from "./payments.router.js";
import passCallBack from "../../middlewares/passCallBack.js";
import fs from "fs";

const order = new OrdersRouter();
const product = new ProductsRouter();
const session = new SessionsRouter();
const user = new UsersRouter();
const payments = new PaymentsRouter();
class ApiRouter extends CustomRouter{
    init(){
        this.router.use("/users",user.getRouter())
        this.router.use("/products",product.getRouter())
        this.router.use("/orders",passCallBack("jwt"), order.getRouter())
        this.router.use("/sessions",session.getRouter())
        this.router.use("/payments",payments.getRouter())
        this.router.use("/logger", async (req, res, next) => {
            try {
                const log = fs.readFileSync("./src/utils/errors/errors.log", "utf-8");
                const log2 = log
                    .split("\n")
                    .map((e) => e.trim())
                    .filter((e) => e !== "");
                return res.json( log2 );
            } catch (error) {
                return next(error);
            }
        });
    }
}


export default ApiRouter