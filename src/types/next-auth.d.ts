import NextAuth, { DefaultSesosin } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      email: string,
      password:string
    } & DefaultSession["user"]
  }
  
}


