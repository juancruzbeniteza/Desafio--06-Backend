import { config } from "dotenv";
import args from "./args.utils.js";

const { env } = args;
const path =
env === "dev" ? "./.env.dev" : env === "prod" ? "./.env.prod" : "./.env.test";
config({ path });

export default {
  PORT: process.env.PORT,
  LINK_MONGO: process.env.LINK_MONGO,
  SECRET: process.env.SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASS: process.env.GOOGLE_PASS,
};