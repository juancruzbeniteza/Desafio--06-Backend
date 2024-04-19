import env from "../env.utils.js";
const mode = env.MODE || "prod";

let logger;

switch (mode) {
  case "prod":
    const { default: winston} = await import("./winston.js");
    logger = winston
    break;
  default:
    const { default: winstonDev } = await import("./winstonDev.js");
    logger = winstonDev
    break;
}

export default logger;