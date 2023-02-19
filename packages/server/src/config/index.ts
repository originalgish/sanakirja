import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 3001,
  mongodb_url: process.env.MONGODB_URL ?? "",
  notion_api_key: process.env.NOTION_API_KEY ?? "",
};
