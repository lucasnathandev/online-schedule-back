import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const controller = {
  schedules: async (req, res) => {
    try {
      const schedules = await prisma.schedule.findMany({
        select: {
          name: true,
          date: true,
          time: true,
        },
      });
      return res.json(schedules);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  schedule: async (req, res) => {
    try {
      const schedule = await prisma.schedule.findFirst({
        where: {
          name: req.params.name,
        },
        select: {
          id: false,
          createdAt: false,
          updatedAt: false,
        },
      });
      return res.json({ schedule });
    } catch (error) {
      return res.json(error.message);
    }
  },
  createSchedule: async () => {
    try {
      const { name, date, time } = req.body;
      const schedule = await prisma.schedule.create({
        data: {
          name,
          date,
          time,
        },
      });
      res.json({ schedule });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  updateSchedule: async (req, res) => {
    const { name, date, time } = req.body;
    const data = { name, date, time };
    try {
    } catch (error) {}
    const schedule = await prisma.schedule.update({
      where: {
        id: req.body.id,
      },
      data,
    });
    res.json({ schedule });
  },
  deleteSchedule: async (req, res) => {
    try {
      await prisma.schedule.delete({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};

export default controller;
