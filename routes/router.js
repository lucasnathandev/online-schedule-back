import express from "express";
import { PrismaClient } from "@prisma/client";
import userController from "../controllers/userController.js";
import scheduleController from "../controllers/scheduleController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
const prisma = new PrismaClient();
/* GET users listing. */
router.get("/users", auth, userController.users);
router.get("/user/:id", auth, userController.user);
router.post("/user/create", auth, userController.createUser);

router.get("/schedules", scheduleController.schedules);
router.get("/schedule/:id", scheduleController.schedule);
router.post("/schedule/create", scheduleController.createSchedule);

export default router;
