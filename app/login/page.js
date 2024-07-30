'use client'
import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import melodyAiImage from '../../public/assets/melodyai.png';
import loginbg from '@/public/assets/loginbg.jpg';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import Link from 'next/link';
import { IoIosArrowBack } from "react-icons/io";


const Login = () => {
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_email, user_password } = e.target.elements;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user_email.value,
        password: user_password.value,
      }),
    });

    if (res.ok) {
      const token = await res.json();
      localStorage.setItem('token', token.token);
      toast.success('Login Successfull', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
      setProgress(90);
      setTimeout(() => {
        router.push('/');
        setProgress(100);
      }, 1500);
    } else if (res.status === 401) {
      setProgress(90);
      toast.error('Invalid Credentials', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setTimeout(() => {
      setProgress(100);
      }, 1000);
    } else {
      const error = await res.json();
      // alert(error.error);
      toast.error({error}, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 w-[inherit]">
      <LoadingBar
        color='#36e2ec'
        progress={progress}
        waitingTime={100}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer />
      <div className="flex w-full h-full max-md:items-center max-md:justify-center">
      <Link className="absolute top-0 left-0" href="/"><div className='sticky m-5 w-9 h-9 rounded-full shadow-sm shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 max-md:text-white'><IoIosArrowBack className="w-8 h-8 absolute left-0 top-[2px]" /></div></Link>
      <Image src={loginbg} alt="loginbg" className="md:hidden flex w-full h-full" />
        <div className="max-md:absolute max-md:w-3/4 md:flex md:flex-col items-center bg-gray-800 bg-opacity-70 max-md:rounded-lg justify-center md:w-1/3 md:bg-white md:shadow-lg p-6">
          <form onSubmit={handleSubmit} className="max-md:text-white md:w-3/4">
            <h3 className="text-xl font-semibold mb-4">Login</h3>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-sm">Email</label>
              <input type="text" name="user_email" id="Email" placeholder="Enter your email" required className="w-full p-2 border border-gray-400 bg-gray-200 mt-1 max-md:text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm">Password</label>
              <input type="password" name="user_password" id="password" placeholder="Enter your password" required className="w-full p-2 border border-gray-400 bg-gray-200 mt-1 max-md:text-black" />
            </div>
            <input type="submit" value="Login" className="w-full p-2 text-white bg-gray-900 cursor-pointer" />
            <div className="mt-4 flex items-center">
              <input type="checkbox" className="mr-2" /><span className="text-sm">Remember me</span>
            </div>
            <p className="mt-6 text-center text-sm">Don&apos;t have an account? <Link href="/signup" onClick={() => {setProgress(90); setTimeout(() => {setProgress(100);}, 1000);}} className="text-teal-400 font-bold">Sign Up</Link></p>
          </form>
        </div>
        <div className="hidden md:flex md:flex-col items-center justify-center w-2/3 bg-gray-900">
          <Image src={melodyAiImage} alt="MelodyAI Logo" className="flex mb-4" />
          <h2 className="hidden md:flex text-3xl font-semibold text-white">MelodyAI</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;