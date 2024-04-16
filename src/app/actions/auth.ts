"use server";

import Cryptr from "cryptr";
import { type z } from "zod";
import { hash } from "bcryptjs";
import { db } from "~/server/db";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import * as nodemailer from "nodemailer";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { generateToken } from "~/lib/utils";
import { type CustomJWTPayload } from "~/types";
import {
  loginFormSchema,
  otpVerifyFormSchema,
  registerFormSchema,
} from "~/lib/validation";

let encryptedToken = null;
const jwtExpires = 60 * 60 * 24 * 7; // 7 days
const cryptr = new Cryptr(process.env.CRYPTR_KEY!);
const key = new TextEncoder().encode(process.env.JWT_SECRET);

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

export async function verifyOtp(
  values: z.infer<typeof otpVerifyFormSchema>,
  encryptedToken: string,
  email: string,
) {
  const result = otpVerifyFormSchema.safeParse(values);

  if (!result.success) {
    return {
      error: "Invalid otp",
    };
  }

  const { pin } = values;

  try {
    const decryptedToken = cryptr.decrypt(encryptedToken);

    if (pin !== decryptedToken) {
      return {
        error: "Invalid otp",
      };
    }

    await db.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
      },
    });
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
  redirect("/login");
}

export async function login(values: z.infer<typeof loginFormSchema>) {
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { email, password } = values;

  try {
    const userInfo = await db.user.findUnique({
      where: { email: email },
    });

    if (!userInfo || !(await compare(password, userInfo.password))) {
      return {
        error: "Invalid email or password",
      };
    }

    const user = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    };

    const session = await new SignJWT({
      user,
      expires: jwtExpires,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${jwtExpires}s`)
      .sign(key);

    cookies().set({
      name: "session",
      value: session,
      path: "/",
    });
  } catch (error) {
    return {
      error: "Something went wrong during login",
    };
  }
  redirect("/");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const { payload } = await jwtVerify(session, key, {
    algorithms: ["HS256"],
  });
  return payload as CustomJWTPayload;
}

export async function logout() {
  cookies().delete("session");
}
