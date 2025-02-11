'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';


function Register() {
  const [email,setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const registerUser = async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
      try {
         if(password !== confirmPassword){
          setError("Password did'nt match")
          return;
         }
         if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
         {
           setError("email is not correct")
           return;
         }
         if(password.length < 6 )
         {
          setError("password at least of 6 characters")
          return;
         }
         setLoading(true);
         setError(null);

         const res = await fetch('/api/auth/register',{
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email,password})
         });

         const data = await res.json();

         if(!res.ok){
           setError(data?.error || "registration failed")
           throw new Error(data?.error || "registration failed")
         }
         router.push('/login');

      } catch (error) {
        console.log('Error, registration failed :: ', error);
        setError('registration failed');
      }finally{
        setLoading(false);
      }
  };
  return (
    <div>
        {error && (
        <div role="alert" className="alert alert-error mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        )}
        <h1 className='text-center mb-4 text-2xl'>Register Here !</h1>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://imgs.search.brave.com/uVJK8g4bMJzWEIP8PW_a7aEREz7BmHUbIwYDhBic9BM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2Qvc29j/aWFsLW1lZGlhLXNh/bGVzLWJhY2tncm91/bmRfMjMtMjE1MTQ2/NTMxNC5qcGc_c2Vt/dD1haXNfaHlicmlk"
              alt="Movie" />
          </figure>
          <form onSubmit={registerUser}>
          <div className="card-body">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-accent w-full max-w-xs mb-4 mt-2"  
                value={email}
                onChange={(e)=>(setEmail(e.target.value))}             
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered input-accent w-full max-w-xs mb-4 mt-4" 
                value={password}
                onChange={(e)=>(setPassword(e.target.value))}  
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered input-accent w-full max-w-xs mb-4 mt-4" 
                value={confirmPassword}
                onChange={(e)=>(setConfirmPassword(e.target.value))} 
              />
              <div className="card-actions justify-center pt-4">
              {loading ? (<span className="loading loading-infinity loading-lg text-error"></span>):(
                <button className="btn btn-outline btn-accent"
                type="submit">Register
                <span><ArrowRight/></span>
                </button>
              )}
              </div>
              <p className='text-center pt-2'>have an account!<Link href={'/login'} className='hover:text-accent'> Login</Link></p>
          </div>
          </form>
        </div>
    </div>
  )
}

export default Register