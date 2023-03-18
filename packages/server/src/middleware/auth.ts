import jwt from "jsonwebtoken";

import { UserModel } from "models";
import { config } from "config";

import type { AuthRequest } from "types";

export const auth = async function (req: AuthRequest, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.jwt_secret);
    const user = await UserModel.findOne({ _id: decoded, "tokens.token": token });
    if (!user) {
      throw new Error("Couldn't find user");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Unauthorized");
  }
};
