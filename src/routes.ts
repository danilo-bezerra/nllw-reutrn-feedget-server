import express from "express";
import { NodemailerAdapter } from "./adapters/NodeMailer/nodemailer-mail-adapter";
import { PrimaFeedbacksRepository } from "./repositories/prisma/prima-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-casses/submit-feedback-use-case";

export const routes = express.Router();



routes.post("/feedbacks", async (req, res) => {
  const {type, comment, screenshot} = req.body
   console.log("============================")
  console.log(req.body)
   console.log("============================")
  console.log(type, comment, screenshot)
  console.log("============================")

  const prismaFeedbackRepository = new PrimaFeedbacksRepository()
  const nodemailerAdapter = new NodemailerAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerAdapter
  );
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return res.status(201).send();
});
