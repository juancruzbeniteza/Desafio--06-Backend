import userService from "../services/userService.js";

class SessionController {
  constructor() {
    this.service = userService;
  }

  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.body;
    await this.service.register({ email, name, verifiedCode });
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res.cookie("token", req.token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }).json({
        statusCode: 200,
        message: "Logged in!",
      });
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
      return next(error);
    }
  };

  forbidden = async (req, res, next) => {
    try {
      return res.status(403).json({ message: "Forbidden" });
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
      };
      return res.json({ statusCode: 200, user });
    } catch (error) {
      return next(error);
    }
  };

  signoutError = (req, res, next) => {
    try {
      return res.status(400).json({ message: "Already done" });
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid verified token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionController;
const controller = new SessionController();
const { register, login, signout, me, badauth, forbidden, signoutError, verifyAccount } = controller;
export { register, login, signout, me, badauth, forbidden, signoutError, verifyAccount };
