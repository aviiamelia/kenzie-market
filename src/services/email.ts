import { sendEmail } from "../email/email.services";
import { IEmail } from "../types/user.types";
export const emailSend = (data: IEmail, admEmail: string) => {
  data.from = admEmail;
  let email = sendEmail(data);
  if (email) {
    return email;
  } else {
    return false;
  }
};
