import { type JWTPayload } from "jose";
import { type Category } from "@prisma/client";

export interface CustomJWTPayload extends JWTPayload {
  user: {
    id: string;
    email: string;
    name: string;
  };
  expires: number;
  iat: number;
  exp: number;
}

export interface ListItemProps {
  id: number;
  name: string;
  isInterested: boolean;
}

export type CategoryWithInterestStatus = Category & { isInterested: boolean };
