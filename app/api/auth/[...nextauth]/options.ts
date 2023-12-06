import axios from "axios";
import {  NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post("http://localhost:3000/api/users/login", {
            email: credentials?.email,
            password: credentials?.password
          });

          const user = res.data;

          if (user) {
            return user;
          } else {
            throw new Error("Custom error message for invalid credentials");
          }
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response?.data?.message) {
            // Log the actual error message received from the server
            console.error("Server error message:", error.response.data.message);
            return Promise.reject(new Error(error.response.data.message));
          } else {
            // Log the generic error
            console.error("Generic error:", error);
            return Promise.reject(new Error("An unexpected error occurred"));
          }
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async jwt({token,user,trigger,session}){
      if(trigger=='update'){
        return {...token,...session.user}
      }
      return {...token,...user};
    },

    async session({session,token}){
      session.user = token as any;  
      return session;
    }
  }
}