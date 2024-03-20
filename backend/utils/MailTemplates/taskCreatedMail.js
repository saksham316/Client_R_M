import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const taskCreatedMail = async (email, projectName, projectId) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });
  //   const __filename = fileURLToPath(import.meta.url);
  //   const __dirname = dirname(__filename);
  //   //   const templatePath = path.join(
  //   //     __dirname,
  //   //     `../../views/taskCreatedMail.ejs`
  //   //   );
  //   //   //   console.log("This is url", url);
  //   //   let data = await ejs.renderFile(templatePath, { url });

  let mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: `A new task is created by you `,
    // html: data,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        //         console.log(chalk.bgGreenBright("Received error here"))
        console.log(error);
        return reject(error);
      } else {
        //         console.log("Thi is resolved OTP sent successfully", info.rejected)
        return resolve("Otp Sent Successfully" + info.response);
      }
    });
  });
};
