import propsProductUtils from "../utils/propsProducts.utils.js";

function propsProduct(req, res, next) {
    try {
      propsProductUtils(req.body)
      return next()
    } catch (error) {
      return next(error)
    }
  }
  

  export default propsProduct;