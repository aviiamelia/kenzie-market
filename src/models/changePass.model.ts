import * as yup from "yup";

export const changePassSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("A new 'Password' is required"),
  code: yup.string().required("A recovery 'code' field is required"),
});
