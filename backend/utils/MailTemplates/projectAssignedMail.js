import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const sendProjectAssignedMail = async (email, url) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  //   const templatePath = path.join(
  //     __dirname,
  //     `../../views/forgetPasswordMail.ejs`
  //   );
  //   //   console.log("This is url", url);
  //   let data = await ejs.renderFile(templatePath, { url });

  let mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: " ",
    html: data,
    // html: `<h1>Please Click the link below to change the password <br/>  ${url}</h1> <br/> <strong>This Link is valid for only 2 minutes</strong>`,
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
