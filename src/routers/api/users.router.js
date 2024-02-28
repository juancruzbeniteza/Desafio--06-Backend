import { Router } from "express"
//import ManagerUser  from "../../data/fs/user.fs.js"
import {ManagerUser}  from "../../data/mongo/manager.mongo.js"
import propsUser from "../../middlewares/UserProps.js";
const usersRouter = Router()

usersRouter.post("/", propsUser, async (req, res, next) => {
    try {
      const data = req.body;
      const response = await ManagerUser.create(data);
      
        return res.json({
          statusCode: 201,
          response,
        });
      
    } catch (error) {
        return next(error);
    }
  });

  usersRouter.get ('/', async (req,res, next)=>{
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
            return res.json({
                statusCode: 200,
                response: users
            })
        }else{
            return res.json({
                statusCode: 404,
                message: "No encontrado"
            })
        }
        
    } catch (error) {
        return next(error);
    }
    
})

usersRouter.get("/:email", async (req, res, next) => {
    try {
      const { email } = req.params;
      const filter = { email: email };
      const all = await ManagerUser.readByEmail(filter);
      return res.json({
        statusCode: 200,
        response: all,
      });
    } catch (error) {
      return next(error);
    }
  });

usersRouter.get ('/:uid', async (req,res, next)=>{
    try {
        const {uid} = req.params
        const user =await ManagerUser.readOne(uid)
        if(user){
            return res.json({
                statusCode: 200,
                response: user
            })
        }else{
            return res.json({
                statusCode: 404,
                message: "No encontrado"
            })
        }
        
    } catch (error) {
        return next(error);
    }
    
})

usersRouter.put('/:uid', async (req,res, next)=>{
    try {
        const {uid} = req.params
        const data = req.body;
        const user = await ManagerUser.update(uid,data)
        if(user){
            return res.json({
                statusCode: 200,
                response: user
            })
        }else{
            return res.json({
                statusCode: 404,
                message: "No encontrado"
            })
        }
        
    } catch (error) {
        return next(error);
    }
})

usersRouter.delete('/:uid', async (req,res, next)=>{
    try {
        const {uid} = req.params
        const user = await ManagerUser.destroy(uid)
        if(user){
            return res.json({
                statusCode: 200,
                response: user
            })
        }else{
            return res.json({
                statusCode: 404,
                message: "No encontrado"
            })
        }
        
    } catch (error) {
        return next(error);
    }
})


export default usersRouter