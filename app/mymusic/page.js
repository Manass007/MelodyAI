"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPodcast, FaHeart } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { LuPhoneCall } from "react-icons/lu";
import LoadingBar from "react-top-loading-bar";
import { IoIosArrowBack } from "react-icons/io";

var jwt = require("jsonwebtoken");

const Mymusic = () => {
  const [progress, setProgress] = useState(0);
 
  return (
    <>
      <LoadingBar
        color="#36e2ec"
        progress={progress}
        waitingTime={100}
        onLoaderFinished={() => setProgress(0)}
      />
      <section className="w-full text-gray-400 bg-gray-900">
      <Link href="/"><div className='sticky m-5 w-9 h-9 rounded-full shadow-sm shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'><IoIosArrowBack className="w-8 h-8 absolute left-0 top-[2px]" /></div></Link>
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">My Music</h1>
      <p className="lg:w-1/2 w-full leading-relaxed text-opacity-80">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
    </div>
    <div className="max-md:grid max-md:grid-cols-2 md:flex md:flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
          <RiPlayListFill className="w-6 h-6" />
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Playlists</h2>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
          <FaPodcast className="w-6 h-6" />
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Podcasts</h2>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
          <FaHeart className="w-6 h-6" />
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Liked Songs</h2>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
          <LuPhoneCall className="w-6 h-6" />
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Hellotunes</h2>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Mymusic;
