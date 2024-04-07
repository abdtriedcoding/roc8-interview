import crypto from "crypto";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Function to generate token
export function generateToken() {
  const token = Math.floor(Math.random() * 90000000) + 10000000;
  return token.toString();
}

// Function to encrypt the token
export const encryptToken = (token: string) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encryptedToken = cipher.update(token, "utf8", "hex");
  encryptedToken += cipher.final("hex");
  return encryptedToken;
};

// Function to decrypt the token
export const decryptToken = (encryptedToken: string) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decryptedToken = decipher.update(encryptedToken, "hex", "utf8");
  decryptedToken += decipher.final("utf8");
  return decryptedToken;
};
