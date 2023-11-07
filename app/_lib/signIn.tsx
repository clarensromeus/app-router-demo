import { ZodType, z } from "zod";
import { ISignIn } from "../_component/typing/UserandProduct";

const SignInValidation: ZodType<ISignIn> = z
  .object({
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

export default SignInValidation;
