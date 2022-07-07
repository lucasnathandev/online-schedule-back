import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

/**
 * Generate Prisma client
 */
const prisma = new PrismaClient();
prisma
  .$connect()
  .then((r) => console.log("Connected to database successfully!"))
  .catch((e) => console.log(e.message));

import auth from "../middlewares/auth.js";

const controller = {
  users: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          name: true,
          role: true,
          password: false,
          createdAt: false,
          updatedAt: false,
        },
      });
      return res.json(users);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  user: async (req, res) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: req.params.id,
        },
        select: {
          name: true,
          role: true,
        },
      });
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { name, password } = req.body;

      const role = req.body.role;
      console.log(req.body.role);
      const encrypted = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          name,
          password: encrypted,
          role,
        },
      });
      return res.send({ created: true });
    } catch (error) {
      console.log(error);
      return res.json({ error: error.message });
    }
  },
};

export default controller;
