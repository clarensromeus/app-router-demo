import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { isError } from "lodash";
import SignInValidation from "@/app/_lib/signIn";
import prismaDB from "@/app/_db/connection";
import bcryptjs from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credential",
      credentials: {
        Email: { label: "Email", type: "text" }, // I can already predict mixing name / and username is gonna get hairy... just comment with the alt every tiem
        Password: { label: "Password", type: "Password" },
      },
      async authorize(credentials, req) {
        const { Email, Password } = credentials as {
          Email: string;
          Password: string;
        };

        // Add logic here to look up the user from the credentials supplied
        const validateUser = await SignInValidation.parse({ Email, Password });

        if (isError(validateUser)) {
          return null;
        }

        const User = await prismaDB.user.findFirst({
          where: { Email: `${Email}` },
        });

        if (!User) {
          return null;
        }

        const isuserExist = await bcryptjs.compare(
          validateUser.Password,
          `${User?.Password}`
        );

        if (!isuserExist) {
          return null;
        }

        const user = {
          id: `${User.id}`,
          name: `${User.Firstname}-${User.Lastname}`,
          password: User.Password,
          email: User.Email,
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
