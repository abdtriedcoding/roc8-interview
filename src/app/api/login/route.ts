import * as jose from "jose";
import { db } from "~/server/db";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { loginFormSchema } from "~/lib/validation";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = loginFormSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return new NextResponse("Invalid email or password", { status: 401 });
    }

    // Create jwt token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(user.id.toString())
      .sign(secret);

    cookies().set("Authorization", jwt, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: "/",
      sameSite: "strict",
    });
    return NextResponse.json({});
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
