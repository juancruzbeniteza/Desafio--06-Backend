import passport from "passport";
import errors from "../utils/errors/errors.js";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        CustomError.new(errors.passCb(info.message || info.toString(), info.statusCode || 401)); 
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};