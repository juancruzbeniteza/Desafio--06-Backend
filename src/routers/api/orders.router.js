import CustomRouter from "../CustomRouter.js";
//import ManagerOrders  from "../../data/fs/orders.fs.js"
import {ManagerOrders}  from "../../data/mongo/manager.mongo.js"

class OrdersRouter extends CustomRouter{
    init(){
        this.post("/", ["USER"], async (req, res, next) => {
            try {
              const data = req.body;
              const response = await ManagerOrders.create(data);
              
                return  res.success201(response)
            } catch (error) {
                return next(error);
            }
          });
          
        
        this.get ('/', ["USER"], async (req,res, next)=>{
            
            try {
                const sortAndPaginate = {
                    sort: {state: 1},
                    page: parseInt(req.query.page) || 1,
                    limit: parseInt(req.query.limit) || 10
                }
        
                const filter = {}
                if(req.query.uid){
                    filter.uid = req.query.uid
                }
        
                if (req.query.state === "desc") {
                    sortAndPaginate.sort.state = -1;
                }
        
                const orders = await ManagerOrders.read({filter,sortAndPaginate})
                if(orders){
                    return res.success200(orders)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
                
            }
            
        })
        
        this.get ('/:uid', ["USER"], async (req,res, next)=>{
            try {
                const {uid} = req.params
                const order =await ManagerOrders.readOne(uid)
                if(order){
                    return res.success200(order)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
            
        })
        
        this.get ('/total/:uid', ["USER"], async (req,res, next)=>{
            try {
                const {uid} = req.params
                const report =await ManagerOrders.report(uid)
                return res.success200(report)
                
            } catch (error) {
                return next(error);
            }
        })
        
        this.delete('/:oid', ["USER"], async (req,res, next)=>{
            try {
                const {oid} = req.params
                const order = await ManagerOrders.destroy(oid)
                if(order){
                    return res.success200(order)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
        })
        
        this.put('/:oid/:quantity/:state', ["USER"], async (req,res, next)=>{
            try {
                const {oid, quantity, state} = req.params
                const order = await ManagerOrders.update(oid,quantity,state)
                if(order){
                    return res.success200(order)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
        })
    }
}

export default OrdersRouter