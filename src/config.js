import { config } from "dotenv";
config();

export default {
  SECRET: process.env.SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  PORT_URL: process.env.PORT,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN
};