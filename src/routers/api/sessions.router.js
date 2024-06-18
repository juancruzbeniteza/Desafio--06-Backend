import CustomRouter from '../CustomRouter.js';
import has8char from '../../middlewares/has8char.js';
import passCb from '../../middlewares/passCb.js';
import passport from 'passport';
import {
  register,
  login,
  signout,
  me,
  forbidden,
  signoutError,
  badauth,
  verifyAccount
} from '../../controllers/sessionController.js';

class SessionsRouter extends CustomRouter {
  init() {
    // Register
    this.post("/register", ["PUBLIC"], has8char, passCb("register"), register);

    // Login
    this.post("/login", ["PUBLIC"], passCb("login"), login);

    // Sign out
    this.post("/signout", ["USER", "ADMIN", "PREM"], passCb("jwt"), signout);

    // Google Authentication
    this.get("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    
    this.get("/google/callback", ["PUBLIC"], passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/login",
    }));

     // Me
    this.post("/", ["USER", "ADMIN", "PREM"], passCb("jwt"), me);

    this.get("/signoutError", ["PUBLIC"], signoutError);

    this.post("/verifyAccount", ["PUBLIC"], verifyAccount);

    // Badauth
    this.get("/badauth", ["PUBLIC"], badauth);

    // Forbidden
    this.get("/forbidden", ["PUBLIC"], forbidden);

    // Signout Error
    this.get("/signoutError", ["PUBLIC"], signoutError);

    // Verify Account
    this.post("/verifyAccount", ["PUBLIC"], verifyAccount);
  }
}

export default SessionsRouter;
