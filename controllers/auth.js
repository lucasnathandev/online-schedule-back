import bcrypt from "bcrypt";
import db from "mongoose";
import User from "../models/userModel.js";

const auth = {
  validate: async (req, res, next) => {
    const password = await User.findOne({
      password: await bcrypt.hash(req.password, 10),
    });
    try {
      const isValid = await bcrypt.compare(req.password, password);
      if (isValid) {
        res.send({ isAuthenticated: true });
        next();
      }
    } catch {
      res.send({ isAuthenticated: false });
    }
  },
};

export default auth;
