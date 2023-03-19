import cors from "cors";
import express from "express";

import { config } from "config";
import { connectDB } from "db";
import { wordsRouter, userRouter } from "routers";

const port = config.port;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(wordsRouter);
app.use(userRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
