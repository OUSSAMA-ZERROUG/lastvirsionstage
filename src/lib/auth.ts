
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userID: { label: "userID", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.userID || !credentials?.password) {
          return null;
        }

        const existingUser = await db.users.findUnique({
          where: { user_gsk_id: credentials.userID },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.hash
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.Id_rappel + "",
          name: existingUser.username,
          email: existingUser.user_email,
          role: existingUser.user_role,
          password: existingUser.hash,
        };
      },
    }),
  ],

  callbacks : {
    async jwt({token,user }) {
     
     if(user){
      return {
        ...token,
        role: user.role,
        id: user.id,
      }
     }
     return token;
    },
  

    async session({ session,token }) {
      return {
      ...session,
      user:{
        ...session.user,
         role: token.role,
         id: token.id,
      }
      };
      
    },
  }


};
