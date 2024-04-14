"use server";

import Cryptr from "cryptr";
import { type z } from "zod";
import { hash } from "bcryptjs";
import { db } from "~/server/db";
import * as nodemailer from "nodemailer";
import { redirect } from "next/navigation";
import { generateToken } from "~/lib/utils";
import { registerFormSchema } from "~/lib/validation";

const cryptr = new Cryptr(process.env.CRYPTR_KEY!);
let encryptedToken = null;

export async function signup(values: z.infer<typeof registerFormSchema>) {
  const result = registerFormSchema.safeParse(values);

  if (!result.success) {
    return {
      error: "Missing or invalid values",
    };
  }

  const { name, email, password } = values;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: "User with the same email already exists",
      };
    }

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = generateToken();
    encryptedToken = cryptr.encrypt(verificationToken);

    const transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: false,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Your verification token is: ${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return {
      error: "Something went wrong during signup",
    };
  }
  redirect(`/sign-up?token=${encryptedToken}&email=${email}`);
}
