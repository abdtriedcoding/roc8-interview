import { db } from "~/server/db";
import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { generateToken } from "~/lib/utils";

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

  const { name, email, password } = await req.json();

  try {
    // Create user in the database
    await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    // Generate and encrypt verification token
    const token = generateToken();
    // Create mail options
    const mailOptions = {
      from: "siddabdullah46@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Your verification token is: ${token}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ token });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
