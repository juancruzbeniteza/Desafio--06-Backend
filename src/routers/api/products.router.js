import CustomRouter from "../CustomRouter.js";
//import ManagerProduct  from "../../data/fs/products.fs.js"
import propsProducts from "../../middlewares/propsProducts.js";
import {ManagerProduct}  from "../../data/mongo/manager.mongo.js"
import isAdmin from "../../middlewares/isAdmin.js";
import passCb from "../../middlewares/passCb.js";

class ProductsRouter extends CustomRouter {
    init(){
        this.post("/",
            ["ADMIN","PREM"],
            passCb("jwt"), 
            isAdmin, 
            propsProducts, 
            async (req, res, next) => {
                try {
                    const data = req.body;
                    const response = await ManagerProduct.create(data);
                    return res.success201(response);
                } catch (error) {
                    return next(error);
                }
        });
        

        this.get ('/', ["PUBLIC"], async (req,res, next)=>{
            try {
                const sortAndPaginate = {
                    sort: {price: 1},
                    page: parseInt(req.query.page) || 1,
                    limit: parseInt(req.query.limit) || 10
                }

                const filter = {}
                if(req.query.title){
                    filter.title = new RegExp(req.query.title.trim(), "i");
                }

                if (req.query.price === "desc") {
                    sortAndPaginate.sort.price = -1;
                }
                const products = await ManagerProduct.read({filter,sortAndPaginate})
                if(products){
                    return res.success200(products)
                    
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
                
            }
            
        })

        this.get ('/:pid', ["PUBLIC"], async (req,res, next)=>{
            try {
                const {pid} = req.params
                const product =await ManagerProduct.readOne(pid)
                if(product){
                    return res.success200(product)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
            
        })

        this.put('/:pid', ["ADMIN","PREM"], async (req,res, next)=>{
            try {
                const {pid} = req.params
                const data = req.body;
                const product = await ManagerProduct.update(pid,data)
                if(product){
                    return res.success200(product)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
        })

        this.delete('/:pid', ["ADMIN","PREM"], async (req,res, next)=>{
            try {
                const {pid} = req.params
                const product = await ManagerProduct.destroy(pid)
                if(product){
                    return res.success200(product)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
        })
    }
}



export default ProductsRouter