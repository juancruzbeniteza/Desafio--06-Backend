import { config } from "dotenv";
import args from "./args.utils.js";

const { env } = args;
const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });

export default {
  PORT: process.env.PORT,
  LINK_MONGO: process.env.LINK_MONGO,
  SECRET: process.env.SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
 
};