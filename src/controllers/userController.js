import userService from "../services/userService.js";
class UserControler{
    constructor(){
        this.service=userService
    }
    
    create=async(req,res)=>{
        try {
            const data = req.body;
            const response = await this.service.create(data);
            
              return res.success201(response);
            
          } catch (error) {
              return next(error);
          }
    }
    read=async(req,res)=>{
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
    
            const users = await this.service.read({filter,sortAndPaginate})
            if(users){
                return res.success200(users)
            }else{
                return res.error404()
            }
            
        } catch (error) {
            return next(error);
        }
    }

    readOne=async(req,res)=>{
        try {
            const {uid} = req.params
            const user =await this.service.readOne(uid)
            if(user){
                return res.success200(user)
            }else{
                return res.error404()
            }
            
        } catch (error) {
            return next(error);
        }
    }

    readByEmail=async(req,res)=>{
        try {
            const { email } = req.params;
            const filter = { email: email };
            const all = await this.service.readByEmail(filter);
            return res.success200(all)
          } catch (error) {
            return next(error);
          }
    }

    update=async(req,res)=>{
        try {
            const {uid} = req.params
            const data = req.body;
            const user = await this.service.update(uid,data)
            if(user){
                return res.success200(user)
            }else{
                return res.error404()
            }
            
        } catch (error) {
            return next(error);
        }
    }

    destroy=async(req,res)=>{
        try {
            const {uid} = req.params
            const user = await this.service.destroy(uid)
            if(user){
                return res.success200(user)
            }else{
                return res.error404()
            }
            
        } catch (error) {
            return next(error);
        }
    }
}

export default UserControler
const  controller = new UserControler()
const {create, read, readByEmail, readOne, update, destroy} = controller
export {create, read, readByEmail, readOne, update, destroy}