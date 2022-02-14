import * as yup from "yup";

export const emailSchema = yup.object().shape({
  to: yup.string().required("To is required field"),
  subject: yup.string().required("subject is required"),
  text: yup.string().required("A text field is required"),
});
