import { z, ZodType } from "zod";
import { ISignUp } from "../_component/typing/UserandProduct";

const SignUpValidation: ZodType<ISignUp<string>> = z
  .object({
    Firstname: z
      .string({ required_error: "firstname must be a string" })
      .trim()
      .min(6, "Firstname is too short")
      .max(30, "Firstname is too long"),
    Lastname: z
      .string({ required_error: "firstname must be a string" })
      .trim()
      .min(6, "Lastname is too short")
      .max(30, "Lastname is too long"),
    Email: z
      .string({ required_error: "must not be empty" })
      .email("enter a valid email"),
    Password: z
      .string({
        required_error: "Password must not be empty",
      })
      .regex(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "please enter a strong password"
      ),
  })
  .required();

export default SignUpValidation;
