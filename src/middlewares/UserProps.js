import propsUserUtils from "../utils/UserProps.js";


function propsUser(req, res, next) {
  try {
    propsUserUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default propsUser;
