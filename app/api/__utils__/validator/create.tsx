import { z } from "zod";

const productValidation = z
  .object({
    ProductName: z
      .string({ required_error: "product name is required" })
      .trim(),
    Price: z.number({ required_error: "Price is required" }).min(100).max(3000),
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

export default productValidation;
