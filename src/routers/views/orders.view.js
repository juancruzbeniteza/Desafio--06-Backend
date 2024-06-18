import CustomRouter from "../CustomRouter.js";
import orders from "../../data/mongo/orders.mongo.js";
import users from "../../data/mongo/users.mongo.js";
import passCallBack from "../../middlewares/passCallBack.js";

class OrdersRouter extends CustomRouter {
  init() {
      this.get("/", ["USER"], passCallBack("jwt"), async (req, res, next) => {
        try {
          const sortAndPaginate = {
              sort: {price: 1},
              page: parseInt(req.query.page) || 1,
              limit: parseInt(req.query.limit) || 10
          }
          const user = await users.readByEmail({email:req.session.email});
          const filter = {
              uid: user._id,
            };
            const all = await orders.read({ filter, sortAndPaginate });
            let allOrders = all.docs.map(doc => doc.toObject())
      
          return res.render("orders", { 
              orders:allOrders,
              next: all.nextPage,
              prev: all.prevPage, 
          });
        } catch (error) {
          return res.render("orders", {
            message: "NO ORDERS YET!",
          });
        } 
      });
  }
}


export default OrdersRouter;