import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [{ username: credentials.identifier }],
          });

          if (!user) {
            throw new Error("No User Found With This Email Address");
          }
          if (!user.isverified) {
            throw new Error("Please Verify Your Email Address before login");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Invalid Password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
   async session({ session, user, token }) {
      if(token){
         session.user._id = token._id;
         session.user.isVerified= token.isVerified;
         session.user.isAcceptingMessage = token.isAcceptingMessage;
         session.user.username = token.username;
      }
      return session
    },
    async jwt({ token, user }) {
      if(user){
         token._id = user._id?.toString();
         token.isVerified = user.isVerified;
         token.isAcceptingMessage = user.isAcceptingMessage;
         token.username =user.username;

      }
      return token
    }
  },
  pages: {
   signIn:"/signin"
  },
  session:{
   strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET

}
