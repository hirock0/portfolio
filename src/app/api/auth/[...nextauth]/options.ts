import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/DB_Connection/dbConnection";
import { UserSchema } from "@/lib/Schema/schema";
import { nanoid } from "@reduxjs/toolkit";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const findUser = await UserSchema.findOne({
            $or: [{ email: credentials?.email }],
          });

          if (findUser == null) {
            return false;
          }
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            findUser.password
          );
          if (isPasswordCorrect) {
            return findUser;
          } else {
            throw new Error("password is incorrect");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<any> {
      await dbConnect();
      try {
        const findUser = await UserSchema.findOne({
          $or: [{ email: user?.email }],
        });

        if (findUser !== null) {
          return findUser;
        } else {
          const PreSaveData = await new UserSchema({
            NanoId: nanoid(),
            name: user?.name,
            email: user?.email,
            userImg: user?.image,
            contact: "",
            address: {
              division: "",
              district: "",
              thana: "",
              postOffice: "",
              postCode: "",
            },
            recentDate: new Date().toLocaleDateString(),
          });
          const SaveData = await PreSaveData.save();
          return SaveData;
        }
      } catch (error: any) {
        throw new Error("SignIn failed");
      }
    },

    // JWT _section_start
    async jwt({ token, user }) {
      await dbConnect();
      if (user) {
        const findUser = await UserSchema.findOne({
          $or: [{ email: user?.email }, { _id: user._id }],
        });
        (token.NanoId = findUser.NanoId),
          (token._id = findUser._id?.toString());
        token.name = findUser.name;
      }

      return token;
    },
    // JWT _section_end
    async session({ session, token }) {
      if (token) {
        (session.user.NanoId = token.NanoId), (session.user._id = token._id);
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/user/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
