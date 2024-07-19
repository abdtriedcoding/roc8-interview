import Cryptr from "cryptr";
import { hash } from "bcryptjs";
import { db } from "~/server/db";
import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { generateToken } from "~/lib/utils";
import { registerFormSchema } from "~/lib/validation";

// TODO: in future delete this because we i created server action that can hadle this all stuff
export const dynamic = "force-dynamic";
const cryptr = new Cryptr(process.env.CRYPTR_KEY!);

export async function POST(req: Request) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
      user: "siddabdullah46@gmail.com",
      pass: "yQL2JdAxzcYRWmwk",
    },
    secure: false,
  });

  try {
    const body = await req.json();
    const data = registerFormSchema.parse(body);
    const { name, email, password } = data;

    // Check if user with the same email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new NextResponse("User with this email already exists", {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 12);

    // Create user in the database
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate and encrypt verification token
    const verificationToken = generateToken();
    const encryptedToken = cryptr.encrypt(verificationToken);

    // Create mail options
    const mailOptions = {
      from: "siddabdullah46@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Your verification token is: ${verificationToken}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ encryptedToken });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
