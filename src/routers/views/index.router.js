import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";
import ProductRouter from './products.view.js';
import SessionsRouter from './sessions.view.js';
import OrdersRouter from './orders.view.js';

const order = new OrdersRouter();
const product = new ProductRouter();
const session = new SessionsRouter();
class ViewsRouter extends CustomRouter{
    init(){

        this.router.use("/sessions", session.getRouter());
        this.router.use("/products", product.getRouter());
        this.router.use("/orders", order.getRouter());

        this.get('/', ["PUBLIC"], async (req, res, next) => {
            try{
                const sortAndPaginate = {
                     sort: {price: 1},
                     page: parseInt(req.query.page) || 1,
                     limit: parseInt(req.query.limit) || 1
                 }
         
                 const filter = {}
                 if(req.query.title){
                     filter.title = new RegExp(req.query.title.trim(), "i");
                 }
         
                 if (req.query.price === "desc") {
                     sortAndPaginate.sort.price = -1;
                 } 
                 const readProducts = await products.read({filter,sortAndPaginate})
                 let allProducts = readProducts.docs.map(doc => doc.toObject())
         
                 return res.render("index",{
                    products: allProducts,
                    next: readProducts.nextPage,
                    prev: readProducts.prevPage,
                    filter: req.query.title,})
             }catch(error){
                 next(error)
             }
        })        
        
        this.get('/real', ["PUBLIC"], async (req, res, next) => {
            try{
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
                const readProducts = await products.read({filter,sortAndPaginate})
                let allProducts = readProducts.docs.map(doc => doc.toObject())
        
                return res.render("real",{products: allProducts})
            }catch(error){
                next(error)
            }
        }) 
        
    }
}



export default ViewsRouter