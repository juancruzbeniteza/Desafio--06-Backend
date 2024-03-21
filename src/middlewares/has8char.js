import has8charUtils from "../utils/has8char.utils.js";

function has8char(req, res, next) {
  try {
    const { password } = req.body;
    if(password){
        has8charUtils(password)
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default has8char;