import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config({
  override: true,
});
// import path from "node:path";
import router from "./routes/router.js";
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["get", "post", "put", "patch", "delete"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

export default app;
