import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { toast } from "~/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateToken() {
  const token = Math.floor(Math.random() * 90000000) + 10000000;
  return token.toString();
}

// TODO need to remove this function
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

// TODO: remove this function
export function pushToast(
  variant: "default" | "destructive" | "success",
  title: string,
) {
  toast({
    variant,
    title,
  });
}
