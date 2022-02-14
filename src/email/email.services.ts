import { transporter } from "./email";
import { IEmail } from "../types/user.types";

export const mailOption = (
  to: string,
  subject: string,
  text: string,
  from: string = "expressnodemailer@gmail.com"
) => {
  return {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };
};

export const sendEmail = (mailOption: IEmail) => {
  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log(info);
    }
  });
  return {
    message: "E-mail send with sucess",
  };
};
