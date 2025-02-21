import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user && user.role) {
        session.user.role = user.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.role) {
        token.role = user.role;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && auth.user) {
        const role = auth.user.role;
        if (role === "student") {
          return Response.redirect(new URL("/dashboard/student", nextUrl));
        } else if (role === "teacher") {
          return Response.redirect(new URL("/dashboard/teacher", nextUrl));
        } else {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
