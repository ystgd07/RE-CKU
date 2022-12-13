import nodemailer from "nodemailer";

const sender = nodemailer.createTransport({
  service: "naver",
  auth: {
    user: process.env.SEND_MAILID,
    pass: process.env.SEND_MAILID_PW,
  },
  host: "smtp.naver.com",
  port: 587,
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
