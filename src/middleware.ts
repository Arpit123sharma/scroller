import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware()
    {
        return NextResponse.next();
    },
    {
        callbacks:
        {
           authorized:({token,req}) => {
            const {pathname} = req.nextUrl
            // for the authentication related routes
            if(
              pathname.startsWith("api/auth") ||
              pathname === "/login" ||
              pathname === "/register"
            ){
                return true;
            }
            //public routes
            if(
                pathname === "/" ||
                pathname.startsWith("/api/videos")
            ) return true;

            return !!token;
           }
        },
    },
)

export const config = {
    matcher : [
        '/',
        '/login',
        '/register',
        '/api/auth/:path*',
        '/api/videos'
    ]
}