import CustomRouter from "../CustomRouter.js";
//import ManagerUser  from "../../data/fs/user.fs.js"
import {ManagerUser}  from "../../data/mongo/manager.mongo.js"
import propsUser from "../../middlewares/propsUser.js";

class UsersRouter extends CustomRouter {
    init() {
        this.post("/", ["PUBLIC"], propsUser, async (req, res, next) => {
            try {
              const data = req.body;
              const response = await ManagerUser.create(data);
              
                return res.success201(response);
              
            } catch (error) {
                return next(error);
            }
          });
        
          this.get ('/', ["ADMIN", "PREM"], async (req,res, next)=>{
            try {
                const sortAndPaginate = {
                    sort: {email: 1},
                    page: parseInt(req.query.page) || 1,
                    limit: parseInt(req.query.limit) || 10
                }
        
                const filter = {}
                if(req.query.name){
                    filter.name = req.query.name
                }
        
                if (req.query.email === "desc") {
                    sortAndPaginate.sort.email = -1;
                }
        
                const users = await ManagerUser.read({filter,sortAndPaginate})
                if(users){
                    return res.success200(users)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
            
        })
        
        this.get("/:email", ["PUBLIC"], async (req, res, next) => {
            try {
              const { email } = req.params;
              const filter = { email: email };
              const all = await ManagerUser.readByEmail(filter);
              return res.success200(all)
            } catch (error) {
              return next(error);
            }
          });
        
        this.get ('/:uid', ["USER","ADMIN", "PREM"], async (req,res, next)=>{
            try {
                const {uid} = req.params
                const user =await ManagerUser.readOne(uid)
                if(user){
                    return res.success200(user)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
            
        })
        
        this.put('/:uid', ["USER","ADMIN", "PREM"], async (req,res, next)=>{
            try {
                const {uid} = req.params
                const data = req.body;
                const user = await ManagerUser.update(uid,data)
                if(user){
                    return res.success200(user)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
        })
        
        this.delete('/:uid', ["USER","ADMIN", "PREM"], async (req,res, next)=>{
            try {
                const {uid} = req.params
                const user = await ManagerUser.destroy(uid)
                if(user){
                    return res.success200(user)
                }else{
                    return res.error404()
                }
                
            } catch (error) {
                return next(error);
            }
        })
        
    }
}


export default UsersRouter