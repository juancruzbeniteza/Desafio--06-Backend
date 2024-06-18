import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.js";
import isAdmin from "../../middlewares/isAdmin.js";

class ProductRouter extends CustomRouter{
    init(){
        this.get('/form', ["ADMIN", "PREM"],  passCallBack("jwt"), isAdmin, (req, res, next) => {
            try{
                return res.render("form",{})
            }catch(error){
                next(error)
            }
        })
    }
}

export default ProductRouter;