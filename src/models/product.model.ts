import * as yup from "yup";

export let productSchema = yup.object().shape({
  name: yup.string().required("Name is a required"),
  category: yup.string().required("Type is a required"),
  price: yup.number().strict(true).required("Price is a required"),
});
