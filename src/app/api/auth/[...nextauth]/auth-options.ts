import { UserSession } from "@/types/next-auth";
import { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/user/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          if (!res.ok) {
            throw new Error(user.message || "Login failed");
          }

          const loginResponse: UserSession = {
            id: user.id,
            username: user.username,
            token: user.token,
            email: user.email,
            expires: user.expiresIn,
          };

          return loginResponse;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error(
            error instanceof Error ? error.message : "Autenticação falhou"
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Error page URL
  },
  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      if (account?.type === "credentials" && user) {
        return {
          ...token,
          ...user,
          ...profile,
          ...account,
          expiresIn: (user as UserSession).expires, // Garantir que expiresIn está disponível para o middleware
        };
      }

      return {
        ...token,
        ...user,
        ...profile,
        ...account,
        expiresIn: token.expires, // Manter expiresIn em renovações de token
      };
    },
    async session({ token }): Promise<Session> {
      return {
        expires: String(token.expires),
        user: {
          id: token.id as string,
          username: token.username as string,
          token: token.token as string,
          email: token.email as string,
          expires: token.expires as string | number,
        },
      };
    },
  },
};
