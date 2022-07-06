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
  users: async function (req, res, next) {
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
  user: async function (req, res) {
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
  createUser: async function (req, res) {
    try {
      if (!req.body) return res.json("No data");
      const { name, password } = req.body;
      if (req.body.role) {
        const { role } = req.body;
      }
      const encrypted = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          password: encrypted,
          role: role ? role : "USER",
        },
      });
      return res.json({ user });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};

export default controller;
