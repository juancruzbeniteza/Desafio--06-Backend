import CustomRouter from "../CustomRouter.js";
import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCb from "../../middlewares/passCb.js";
import {
  register,
  login,
  signout,
  me,
  forbidden,
  signoutError,
  badauth,
  verifyAccount,
} from "../../controllers/sessionController.js";

class SessionsRouter extends CustomRouter {
  init() {
    

    //register
    this.post("/register", ["PUBLIC"], has8char, passCb("register"), register);

    //login
    this.post("/login", ["PUBLIC"], passCb("login"), login);

    //signout
    this.post("/signout", ["USER", "ADMIN", "PREM"], passCb("jwt"), signout);

    //badauth
    this.get("/badauth", ["PUBLIC"], badauth);

    //forbidden
    this.get("/forbidden", ["PUBLIC"], forbidden);

    //me
    this.post("/", ["USER", "ADMIN", "PREM"], passCb("jwt"), me);

    this.get("/signoutError", ["PUBLIC"], signoutError);

    this.post("/verifyAccount", ["PUBLIC"], verifyAccount);
  }
}

export default SessionsRouter;