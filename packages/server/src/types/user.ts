import type { Document, Model } from "mongoose";
import type { User } from "@sanakirja/shared";

export interface CustomUserDocument extends User, Document {
  generateAuthToken: () => Promise<string>;
}

export interface CustomUserModel extends Model<CustomUserDocument> {
  findByCredentials: (email: string, password: string) => Promise<CustomUserDocument>;
}
