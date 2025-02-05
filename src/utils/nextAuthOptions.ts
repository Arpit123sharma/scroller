import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user.models";
import connectDB from "@/utils/dbconnection";


export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials){
               if(!credentials?.email.trim() || !credentials?.password.trim()){
                  throw new Error("all the credentials are required");
               }
               try {
                await connectDB()
                const user = await User.findOne({email:credentials.email})
                if(!user){
                    throw new Error("user not found");
                }

                const isValidPassword = await user.isValidPassword(credentials.password);
                if(!isValidPassword){
                    throw new Error("incorrect password");
                }

                return{
                    id: user._id.toString(),
                    email: user.email
                }
               } catch (error) {
                  throw new Error('error during authentication')
                  
               }
            }
        })
    ],
    callbacks:{
        async jwt({user,token}){
            token.id = user.id
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:30*24*60*60
    },
    secret:process.env.NEXTAUTH_SECRET
}