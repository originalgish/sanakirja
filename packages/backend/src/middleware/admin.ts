import type { AuthRequest } from "types";

export const admin = async function (req: AuthRequest, res, next) {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Not enough permissions.");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Not enough permissions." });
  }
};
