import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const controller = {
  login: async (req, res) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          name: req.body.name,
        },
      });
      const isValid = await bcrypt.compare(req.body.password, user.password);
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        authenticated: isValid,
        token: isValid ? token : null,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  logout: async (req, res) => {
    res.json({
      authenticated: false,
      token: null,
    });
  },
};

export default controller;
