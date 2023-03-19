import mongoose from "mongoose";

import { config } from "config";

export const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.mongodb_url);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Connected to MongoDB!");
  }
};
