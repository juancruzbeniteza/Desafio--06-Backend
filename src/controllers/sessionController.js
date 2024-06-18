import userService from "../services/userService.js"

class SessionControler{
    constructor(){
        this.service= userService
    }

    register = async (req, res, next) => {
      const { email, name, verifiedCode } = req.body;
      await this.service.register({ email, name, verifiedCode });
      const response= await this.service.readByEmail({email:email})
      try {
        return res.json({
          statusCode: 201,
          message: "Registered!",
          payload: response,
        }); 
        
      } catch (error) {
        return next(error);
      }
    };

    login= async (req,res, next)=>{
        try {
            return res.cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .success200("Logged in!");
          }catch (error) {
          return next(error);
        }
    }

    signout= async (req,res, next)=>{
        try {
            return res.clearCookie("token").success200("Signed out!");
        } catch (error) {
          return next(error);
        }
    }

    badauth= (req,res, next)=>{
        try {
            return res.error401();
          } catch (error) {
            return next(error);
          }
    }

    forbidden= async (req,res, next)=>{
        try {
            return res.error403();
          } catch (error) {
            return next(error);
          }
    }

    me= async (req,res, next)=>{
        try {
            const user = {
              email: req.user.email,
              role: req.user.role,
            }
            return res.success200(user)
          } catch (error) {
            return next(error);
          }
    }

    signoutError= (req,res, next)=>{
        try {
            return res.error400("Already done");
          } catch (error) {
            return next(error);
          }
    }

    verifyAccount = async (req, res, next) => {
      try {
        const { email, verifiedCode } = req.body;
        const user = await service.readByEmail(email);
        if (user.verifiedCode === verifiedCode) {
          await service.update(user._id, { verified: true });
          return res.success200(user)
          /* return res.json({
            statusCode: 200,
            message: "Verified user!",
          }); */
        } else {
          return res.error400("Invalid verified token!");
          /* return res.json({
            statusCode: 400,
            message: "Invalid verified token!",
          }); */
        }
      } catch (error) {
        return next(error);
      }
    };
}

export default SessionControler
const  controller = new SessionControler()
const {register, login, signout, me, badauth, forbidden, signoutError, verifyAccount} = controller
export {register, login, signout, me, badauth, forbidden, signoutError, verifyAccount}