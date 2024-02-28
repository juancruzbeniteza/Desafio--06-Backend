import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import loginRouter from './login.router.js';

const apiRouter = Router()

apiRouter.use("/users",usersRouter)
apiRouter.use("/products",productsRouter)
apiRouter.use("/orders",ordersRouter)
apiRouter.use('/login', loginRouter);

export default apiRouter