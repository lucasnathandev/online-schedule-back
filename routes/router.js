import express from "express";
import { PrismaClient } from "@prisma/client";
import userController from "../controllers/userController.js";
import scheduleController from "../controllers/scheduleController.js";
import loginController from "../controllers/loginController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
const prisma = new PrismaClient();
/* GET users listing. */
router.get("/users", auth, userController.users);
router.get("/user/:id", auth, userController.user);
router.post("/user/create", auth, userController.createUser);

router.post("/login", loginController.login);
router.post("/logout", loginController.logout);

router.get("/schedules", auth, scheduleController.schedules);
router.get("/schedule/:id", auth, scheduleController.schedule);
router.post("/schedule/create", auth, scheduleController.createSchedule);
router.put("/schedule/update/:id", auth, scheduleController.updateSchedule);
router.delete("/schedule/delete/:id", auth, scheduleController.deleteSchedule);

export default router;
