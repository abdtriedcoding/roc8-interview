import { type JWTPayload } from "jose";

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
  isChecked: boolean;
}
