import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(50),
});

export const otpVerifyFormSchema = z.object({
  pin: z.string().min(8, {
    message: "Your one-time password must be 8 characters.",
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Enter valid password",
    })
    .max(50),
});
