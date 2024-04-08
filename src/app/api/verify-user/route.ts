import { db } from "~/server/db";
import { NextResponse } from "next/server";
import Cryptr from "cryptr";
const cryptr = new Cryptr("abdullah786");

interface ItemsProps {
  pin: string;
  email: string;
  encryptToken: string;
}

export async function POST(req: Request) {
  const { pin, email, encryptToken }: ItemsProps = await req.json();
  try {
    const decryptedToken = cryptr.decrypt(encryptToken);

    if (pin !== decryptedToken) {
      console.log(decryptedToken);
      return new NextResponse("Invalid OTP", { status: 400 });
    }

    await db.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
      },
    });
    return new NextResponse("OTP Successfully Verified", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
