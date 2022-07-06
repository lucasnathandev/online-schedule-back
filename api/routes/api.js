import express from "express";
import bcrypt from "bcrypt";
const api = express.Router();

api.get("/send", async (req, res, next) => {
  const data = req.body;
  if (Object.entries(data).length < 1 || !data.name || !data.date || !data.time)
    return res.status(204).send("Não existem dados para serem enviados.");
  const scheduled = await Schedule.create(data);
  scheduled && res.status(201).send("Horário agendado");
});

api.get("/admin/auth", async (req, res, next) => {
  // Precisa arrumar
  res.send(req.body);
});

api.get("/admin/auth", async (req, res, next) => {
  const { user: username, password } = req.body;
  const { user, password: encrypted } = await Admin.findOne({}).select(
    "+password"
  );
  if (username === user && (await bcrypt.compare(password, encrypted))) {
    return res.status(200).send({ message: "OK" });
  }
  res.status(404).send({ message: "Credenciais inválidas." });
});

export default api;
