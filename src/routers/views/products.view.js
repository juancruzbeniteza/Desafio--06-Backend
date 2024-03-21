import CustomRouter from "../CustomRouter.js";
import passCb from "../../middlewares/passCb.js";
import isAdmin from "../../middlewares/isAdmin.js";
//import {ManagerProduct}  from '../../data/mongo/manager.mongo.js'

class ProductRouter extends CustomRouter{
    init(){
        this.get('/form', ["ADMIN", "PREM"],  passCb("jwt"), isAdmin, (req, res, next) => {
            try{
                return res.render("form",{})
            }catch(error){
                next(error)
            }
        })
    }
}

export default ProductRouter;