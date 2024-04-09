import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateToken() {
  const token = Math.floor(Math.random() * 90000000) + 10000000;
  return token.toString();
}

// Decode the JWT token to extract user's email
export function decodeAuthToken(authToken: string) {
  if (authToken) {
    const decodedToken = jwtDecode(authToken);
    const email: string = decodedToken?.email;
    return email;
  }
  return null;
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}
