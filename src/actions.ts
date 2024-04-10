"use server";

import { db } from "./server/db";
import { cookies } from "next/headers";
import { decodeAuthToken } from "~/lib/utils";

export default async function getCurrentUser() {
  const token = cookies().get("Authorization");
  if (!token) {
    return null;
  }

  const email = decodeAuthToken(token.value);
  if (!email) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    return { ...user, password: undefined };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
