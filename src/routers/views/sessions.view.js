import CustomRouter from "../CustomRouter.js";

class SessionsRouter extends CustomRouter{
  init(){
    this.get('/register', ["PUBLIC"], async (req, res, next) => {
        try{
            return res.render("register",{})
        }catch(error){
            next(error)
        }
    })
    
    this.get("/login", ["PUBLIC"], async(req,res,next)=>{
        try {
          return res.render("login")
        } catch (error) {
          return next(error)
        }
      })
  }
}

export default SessionsRouter;