import CryptoJS from "crypto-js";
import { db } from "~/server/db";
import { NextResponse } from "next/server";

interface ItemsProps {
  pin: string;
  email: string;
  encryptToken: string;
}

export async function POST(req: Request) {
  const { pin, email, encryptToken }: ItemsProps = await req.json();
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptToken, "secret-key");
    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (pin !== decryptedToken) {
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
