import propsUserUtils from "../utils/propsUser.utils.js";

function propsUser(req, res, next) {
  try {
    propsUserUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
  }
  

  export default propsUser;