import type { Document, Model } from "mongoose";
import type { User } from "@sanakirja/shared";

export interface CustomUserDocument extends Omit<User, "_id">, Document {
  generateAuthToken: () => Promise<string>;
}

export interface CustomUserModel extends Model<CustomUserDocument> {
  findByCredentials: (name: string, password: string) => Promise<CustomUserDocument>;
}
