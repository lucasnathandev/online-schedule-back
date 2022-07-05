import express from "express";
import cors from "cors";
const api = express();
import apiRoutes from "./routes/api.js";
import morgan from "morgan";

const port = process.env.PORT || 8000;

api.use(
  cors({
    origin: "http://localhost:5000",
    methods: ["get", "post", "patch", "put", "delete"],
  })
);
api.use(morgan("dev"));
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(apiRoutes);

api.listen(port, () => {
  console.log("Running on port:", port);
});

export default { port };
