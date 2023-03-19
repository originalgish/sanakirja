import type { Request } from "express";
import type { Schema } from "mongoose";

import type { CustomUserDocument } from "types";

export type AuthRequest = {
  token: string;
  user: CustomUserDocument & {
    _id: Schema.Types.ObjectId;
  };
} & Request;
