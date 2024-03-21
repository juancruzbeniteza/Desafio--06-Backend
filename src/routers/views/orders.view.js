import CustomRouter from "../CustomRouter.js";
import { ManagerOrders, ManagerUser } from "../../data/mongo/manager.mongo.js";
import passCb from "../../middlewares/passCb.js";
/* import User from "../../data/mongo/models/users.models.js"; */

class OrdersRouter extends CustomRouter {
  init() {
      this.get("/", ["USER"], passCb("jwt"), async (req, res, next) => {
        try {
          const sortAndPaginate = {
              sort: {price: 1},
              page: parseInt(req.query.page) || 1,
              limit: parseInt(req.query.limit) || 10
          }
          const user = await ManagerUser.readByEmail({email:req.session.email});
          const filter = {
              uid: user._id,
            };
            const all = await ManagerOrders.read({ filter, sortAndPaginate });
            let orders = all.docs.map(doc => doc.toObject())
      
          return res.render("orders", { 
              orders:orders,
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