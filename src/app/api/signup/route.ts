import Cryptr from "cryptr";
import { hash } from "bcryptjs";
import { db } from "~/server/db";
import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { generateToken } from "~/lib/utils";
import { registerFormSchema } from "~/lib/validation";

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
