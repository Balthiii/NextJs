import NextAuth from "next-auth";
import { UserRole } from "./app/lib/definitions";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface JWT {
    role: UserRole;
  }
}
