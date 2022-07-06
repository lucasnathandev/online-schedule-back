import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.body.id,
    },
  });
  try {
    const isValid = await bcrypt.compare(req.body.password, user.password);
    const isAdmin = user.role === "ADMIN";
    if (isValid) {
      if (isAdmin) {
        res.json({ isAdmin });
        return next();
      }
      res.send({ isAuthenticated: true });
      return next();
    }
  } catch {
    return res.send({ isAuthenticated: false });
  }
};

export default auth;
