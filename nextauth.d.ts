// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

export type Role = "normal" | "admin" | "helper";
interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  role: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
