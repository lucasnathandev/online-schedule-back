import mongoose from "mongoose";
import fs from "fs";

const { localURI } = "mongodb://localhost:27017/onlineSchedule";

const uri =
  process.env.NODE_ENV == "production" ? process.env.DB_URI : localURI;

mongoose
  .connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log(`Connected to schedule database succesfully!`);
  })
  .catch((err) => {
    throw new Error("Connection with schedule database failed.");
  });

mongoose.Promise = global.Promise;

export default mongoose;
