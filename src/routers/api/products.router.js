import CustomRouter from "../CustomRouter.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.js";
import passCallBack from "../../middlewares/passCallBack.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/productController.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.post(
      "/",
      ["ADMIN", "PREM"],
      passCallBack("jwt"),
      isAdmin,
      propsProducts,
      create
    );
    
    this.get("/", ["PUBLIC"], read);

    this.get("/:pid", ["PUBLIC"], readOne);

    this.put("/:pid", ["ADMIN", "PREM"], update);

    this.delete("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

export default ProductsRouter;