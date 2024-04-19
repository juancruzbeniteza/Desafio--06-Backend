import { createLogger, format, transports} from "winston";
const { simple } = format;

const levels = { ERROR: 0, WARN: 1, INFO: 2, HTTP: 3 };

export default createLogger({
  levels,
  transports: [
    new transports.Console({ level: "HTTP", format: simple() }),
    new transports.File({
      level: "ERROR",
      format: simple(),
      filename: "./src/utils/errors/errors.log",
    }),
  ],
});