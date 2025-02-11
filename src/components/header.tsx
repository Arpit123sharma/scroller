import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

function Header() {
    const {data:session} = useSession();
    const logOut = async()=>{
        try {
            await signOut();
        } catch (error) {
            console.log('error while logging out the user :: ',error);  
        }
    };
  return (
    <div>
        {session ? (
            <button className="btn btn-outline btn-accent">LogOut</button>
        ):(
        <div>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
        </div>
        )}
    </div>
  )
}

export default Header