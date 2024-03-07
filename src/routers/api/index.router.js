import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import loginRouter from './login.router.js';
import Sessrouter from "./sessions.router.js";

const apiRouter = Router()

apiRouter.use("/users",usersRouter)
apiRouter.use("/products",productsRouter)
apiRouter.use("/orders",ordersRouter)
apiRouter.use("/login", loginRouter);
apiRouter.use("/sessions", Sessrouter)

export default apiRouter