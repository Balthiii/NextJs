import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // Ajoutez une vérification pour s'assurer que user et user.role existent
      if (session.user && user && user.role) {
        session.user.role = user.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Ajoutez une vérification pour s'assurer que user et user.role existent
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
        return false; // Redirect unauthenticated users to login page
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
  providers: [
    // Ajoutez vos fournisseurs d'authentification ici
  ],
} satisfies NextAuthConfig;
