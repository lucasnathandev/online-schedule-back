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
          id: req.params.id,
        },
        select: {
          name: true,
          date: true,
          time: true,
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
      await prisma.schedule.create({
        data: {
          name,
          date,
          time,
        },
      });
      res.json({ created: true });
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  updateSchedule: async (req, res) => {
    const { name, date, time } = req.body;
    const data = { name, date, time };
    try {
      const schedule = await prisma.schedule.update({
        where: {
          id: req.params.id,
        },
        data,
      });
      res.json({ schedule });
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      const deleted = await prisma.schedule.delete({
        where: {
          id: req.params.id,
        },
      });
      res.json(deleted);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};

export default controller;
