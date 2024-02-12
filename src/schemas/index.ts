import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
const emailRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = yup.object().shape({
    username: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .matches(emailRules, {message:"Username must contain a letter and a number"})
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Password must contain a letter and a number" })
    .required("Required"),
});

