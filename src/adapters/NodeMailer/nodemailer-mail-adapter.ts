import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4a7d84eb20fc26",
    pass: "2095b4d13d658d",
  },
});

export class NodemailerAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData) {
      await transport.sendMail({
        from: "Equipe Feedget <alien@feedget.com>",
        to: "AlienDoubT <ds1515753@gmail.com>",
        subject: subject,
        html: body,
      });
    }
}