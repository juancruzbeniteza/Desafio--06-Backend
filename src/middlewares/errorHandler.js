import logger from "../utils/logger/index.js";

const errorHandler = (error, req, res, next) => {
    if (!error.statusCode || error.statusCode === 500) {
        error.statusCode = 500;
        logger.ERROR(error.message);
      } else {
        logger.WARN(error.message);
      }
    return res.json({
        statusCode: error.statusCode || 500,
        message: `${req.method} ${req.url} ${error.message}`,
    })
}

export default errorHandler