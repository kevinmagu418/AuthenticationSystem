import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github"; // or any
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";



export const authOptions= {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),

      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };