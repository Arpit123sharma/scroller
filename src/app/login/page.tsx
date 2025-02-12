"use client";

import React from "react";
import Link from "next/link";
import toast from 'react-hot-toast';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const LoginUser = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      setLoading(true)
      if(!email || !password){
        toast.error("all credentials are necessary")
        console.log("all credentials are necessary");
        return;
      }

      const result = await signIn("credentials",{
        email:email,
        password:password,
        redirect:false
      });

      if(result?.error){
        toast.error(result.error || "Login failed")
        console.log(result.error || "Login failed");
        return;
      }

      toast.success("login successfully")
      router.push("/")
    } catch (error) {
      toast.error(error instanceof Error || "login failed");
      console.error('Error: while signing user :: ',error);
    }finally{
      setLoading(false);
    }
  };

  return (
      <div className="flex h-screen w-screen justify-center items-center bg-[url('https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover">
      {/* Glass-like card */}
      <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 w-[350px] flex flex-col items-center space-y-6">
        {/* Placeholder star icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l3.09 6.26 6.91.99-5 4.87 
                 1.18 6.88L12 17.77l-6.18 3.25 
                 L6.91 14.12l-5-4.87 6.91-.99L12 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-white">Scroller</h1>

        {/* Login form */}
        <form className="w-full flex flex-col space-y-4" onSubmit={LoginUser}>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered bg-transparent border-gray-500 text-white placeholder-gray-400w-full input-error"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered bg-transparent border-gray-500 text-white placeholder-gray-400 w-full input-error"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {loading ? (
           <div className="p-1 flex justify-center">
             <span className="loading loading-dots loading-lg text-error"></span>
           </div>
            ):(
            <button
              type="submit"
              className="btn bg-accent text-black w-full  hover:bg-error"
            >
              Sign in
            </button>
          )}
          
        </form>

        {/* Sign in with Google button */}
        <button
          className="btn btn-outline border-gray-500 
                     text-white w-full flex items-center 
                     justify-center gap-2"
        >
          {/* You can replace this with a real Google icon */}
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.35 11.1h-9.31v2.83h5.37
                 c-.23 1.3-1.45 3.81-5.37 3.81
                 -3.23 0-5.86-2.66-5.86-5.86
                 s2.63-5.86 5.86-5.86c1.66 0
                 3.06.62 4.11 1.64l1.98-1.98
                 C15.76 3.54 14 2.91 12.04 2.91
                 7.57 2.91 4 6.48 4 10.95
                 s3.57 8.04 8.04 8.04
                 c4.65 0 7.85-3.27 7.85-7.85
                 0-.52-.06-1.02-.16-1.49z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Footer link */}
        <p className="text-white text-sm">
          Don’t have an account?{" "}
          <Link href={'/register'} className="hover:text-error text-accent">Register Here</Link>
        </p>
      </div>
      </div>
  );
}

export default Page;
