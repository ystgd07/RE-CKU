import nodemailer from "nodemailer";

const sender = nodemailer.createTransport({
  service: "naver.com",
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
  host: "smtp.naver.com",
  port: 587,
  tls: {
    rejectUnauthorized: false,
  },
});

const send = async (option) => {
  console.log(process.env.MAILER_USER, "메일러 ㅋㅋ🔥");
  sender.sendMail(option, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log(info);
    return info;
  });
};
const random = (min: number, max: number) => {
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};
export { send, random };
