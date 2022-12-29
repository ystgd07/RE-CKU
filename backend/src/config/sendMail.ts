import nodemailer from "nodemailer";

const sender = nodemailer.createTransport({
  service: "Google",
  auth: {
    user: process.env.MAILER_USER || "123",
    pass: process.env.MAILER_PASSWORD || "123",
  },
  // host: "smtp.naver.com",
  // port: 587,
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
});

const send = async (option) => {
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
