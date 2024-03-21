import CustomRouter from "../CustomRouter.js";
import has8char from "../../middlewares/has8char.js";
import passport from "../../middlewares/passport.js";
import passCb from "../../middlewares/passCb.js";

class SessionsRouter extends CustomRouter {
  init() {
          //google
      this.post(
        "/google",
        passport.authenticate("google", { scope: ["email", "profile"] }));

      //google-callback
      this.get(
        "/google/cb",
        passport.authenticate("google", {
          session: false,
          failureRedirect: "/api/sessions/badauth",
        }),
        async (req, res, next) => {
          try {
            return res.success200({
              message: "Logged in with google!",
              session: req.session,
            })
              
          } catch (error) {
            return next(error);
          }
        }
      );

      //register
      this.post("/register", 
      ["PUBLIC"],
      has8char,  
      passCb("register"), 
      async (req, res, next) => {
        try {
          return res.success201("Registered!");
        } catch (error) {
          return next(error);
        }
      });

      //login
      this.post("/login",
        ["PUBLIC"], 
        passCb("login"),
      async (req, res, next) => {
        try {
            return res.cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .success200("Logged in!");
          }catch (error) {
          return next(error);
        }
      });

      //signout
      this.post("/signout",
      ["USER", "ADMIN", "PREM"],
      passCb("jwt"),
      async (req, res, next) => {
        try {
            return res.clearCookie("token").success200("Signed out!");
        } catch (error) {
          return next(error);
        }
      });

      //badauth
      this.get("/badauth",["PUBLIC"], (req, res, next) => {
        try {
          return res.error401();
        } catch (error) {
          return next(error);
        }
      });

      //forbidden
      this.get("/forbidden",["PUBLIC"], (req, res, next) => {
        try {
          return res.error403();
        } catch (error) {
          return next(error);
        }
      });

      //me
      this.post("/", ["USER", "ADMIN", "PREM"], passCb("jwt"), async (req, res, next) => {
        try {
          const user = {
            email: req.user.email,
            role: req.user.role,
          }
          return res.success200(user)
        } catch (error) {
          return next(error);
        }
      });

      this.get("/signoutError",["PUBLIC"], (req, res, next) => {
        try {
          return res.error400("Already done");
        } catch (error) {
          return next(error);
        }
      });
  }
}

export default SessionsRouter;