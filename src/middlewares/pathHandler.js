import logger from "../utils/logger/index.js"
const pathHandler = (req, res, next) => {
    logger.WARN(`${req.method} ${req.url} not found path`)
    return res.json({
        statusCode: 404,
        message: `${req.method} ${req.url} not found path`,
    })
}

export default pathHandler