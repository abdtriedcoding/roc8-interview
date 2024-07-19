import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateToken() {
  const token = Math.floor(Math.random() * 90000000) + 10000000;
  return token.toString();
}
