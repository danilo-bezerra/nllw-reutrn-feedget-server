import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4a7d84eb20fc26",
    pass: "2095b4d13d658d",
  },
});

app.get("/users", (req, res) => {
  return res.send("Hello world");
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });
  await transport.sendMail({
    from: "Equipe Feedget <alien@feedget.com>",
    to: "AlienDoubT <ds1515753@gmail.com>",
    subject: "New Feedback from Feedget",
    html: [
      `<div style={font-family: sans-serif, font-size: 16px, color: #111}>`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });
  return res.status(201).json({data: feedback})
});

app.listen(3333, () => {
  console.log("Server started on port 3333");
});
