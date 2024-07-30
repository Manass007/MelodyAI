import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { BsSearch } from "react-icons/bs";
import Link from 'next/link';
import melodyAiImage from '../public/assets/melodyai.png'
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { BsPlayCircleFill, BsPauseCircleFill  } from "react-icons/bs";
import { FaBars} from "react-icons/fa6";
import { FaTimes, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail } from 'react-icons/ai';
import { IoLogoInstagram } from "react-icons/io5";
import { useState, useEffect, useRef  } from 'react';
import { useAudio } from '@/components/Audiocontext';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var jwt = require('jsonwebtoken');



const Songs = ({Logout, setProgress, user }) => {
  const {playSongFromFirebaseStorage, playSongName, isPlaying, playAudio, pauseAudio } = useAudio();
  const [songs, setSongs] = useState([]);
  const [dropdown, setdropdown] = useState(false);
  const [artistsongs, setArtistSongs] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [newUser, setnewUser] = useState(null);
  const popSongsRef = useRef(null);
  const popArtistRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user.value != null) {
        const decoded = jwt.decode(user.value);
        setnewUser(decoded);
    }
  }, [])
  

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await fetch('https://melody-ai-1-0.vercel.app/api/getsongs');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }

    fetchSongs();
  }, []);

  useEffect(() => {
    async function fetchArtistSongs() {
      try {
        const response = await fetch('https://melody-ai-1-0.vercel.app/api/getartists');
        const data = await response.json();
        setArtistSongs(data);
      } catch (error) {
        console.error('Error fetching Artist Profile:', error);
      }
    }

    fetchArtistSongs();
  }, []);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
  };

  const handlePlayPauseClick = (songName,song) => {
    if (playSongName === songName && isPlaying) {
      // console.log(playingSong);
      pauseAudio();
    } else {
      playSongFromFirebaseStorage(songName,song);
      playAudio();
      // console.log(playingSong);
    }
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const router = useRouter();

  const navigateToLogin = () => {
    setProgress(90);
    setTimeout(() => {
      router.push('/login');
      setProgress(100);
    }, 1000);
  };

  const navigateToSignup = () => {
    setProgress(90);
    setTimeout(() => {
      router.push('/signup');
      setProgress(100);
    }, 1000);
  };
  const checkLogin = () => {
    if(user.value != null) {
      setProgress(90);
      setTimeout(() => {
        router.push('/mymusic');
        setProgress(100);
      }, 1000);
    } else {
      toast.error('Please Login First', {
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
  }
  // console.log(newUser);

  return (
    <>
    <div className='max-md:w-full song_side font-poppins z-[2] w-3/4 bg-[#0b1320] h-[87vh] shadow-[5px_0px_2px_#090f1f] text-white'>
    <ToastContainer />
      <div className={isOpen ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 z-[999]' : ''}>
            <div className={isOpen ? 'fixed left-0 top-0 w-[75%] sm:[60%] md:w-[45%] h-screen z-[1000] bg-[#0b1320] p-5 ease-in duration-500':'fixed left-[-100%] top-0 p-5 ease-in duration-500'}>
              <div className='flex w-full items-center justify-between'>
                <Link href="/"><Image onClick={() =>  setIsOpen(false)} src={melodyAiImage} className='h-16 w-24' alt='/'></Image></Link>
                <div onClick={toggleMenu} className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'><FaTimes/></div>
              </div>
              <div className='border-b border-gray-300 my-4'>
                <p className='w-[85%] md:w-[90%]'>Welcome to Melody AI</p>
              </div>
              <div className='py-4 flex flex-col'>
                <ul className='uppercase'>
                  <Link href="/">
                    <li onClick={() =>  setIsOpen(false)} className='py-4 text-sm'>Home</li>
                  </Link>
                  <Link href="#" onClick={checkLogin}>
                    <li onClick={() =>  setIsOpen(false)} className='py-4 text-sm'>My music</li>
                  </Link>  
                  <Link href="/airecommends">
                    <li onClick={() =>  setIsOpen(false)} className='py-4 text-sm'>AI recommends &apos;Coming Soon&apos; </li>
                  </Link>
                  <Link href="/feedback">
                    <li onClick={() =>  setIsOpen(false)} className='py-4 text-sm'>FeedBack</li>
                  </Link>
                </ul>
                <div className='pt-20'>
                  <p className='uppercase tracking-widest text-[#5651e5]'>Let&apos;s Connect</p>
                  <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'>
                    <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                     <a href="https://www.linkedin.com/in/manas-kumar-gupta-0b8657310/"> <FaLinkedinIn/> </a>
                    </div>
                    <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                     <a href="https://github.com/Manass007"> <FaGithub/> </a>
                    </div>
                    <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                      <AiOutlineMail/>
                    </div>
                    <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                      <a href="https://www.instagram.com/_lancelord_/"> <IoLogoInstagram/> </a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <nav className='md:hidden w-[90%] h-[10%] m-auto flex items-center justify-between text-white'><FaBars className='w-6 h-6' onClick={toggleMenu} /><div className='flex'><BsSearch className='w-6 h-6 self-center mr-5' />{user.value && <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}} className='user relative w-[30px] h-[30px] border border-solid border-white rounded-[50%]'>{dropdown && <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}} className='absolute right-2 bg-slate-800 top-7 rounded-md px-5 w-36'><ul><li className='py-1 hover:text-[#5adae0] text-sm cursor-pointer'>My Account</li><li onClick={Logout} className='py-1 hover:text-[#5adae0] text-sm cursor-pointer'>Logout</li></ul></div>}<div className='w-full h-full rounded-[50%] shadow-[2px_2px_8px_#121213] text-center bg-[#36e2ec] text-lg '>{newUser && newUser.name ? newUser.name[0].toUpperCase() : ''}</div></div>}
        {!user.value && <div className="flex justify-center space-x-2">
          <button
            onClick={navigateToLogin}
            className="bg-[#36e2ec] hover:bg-[#5adae0] text-black font-semibold py-1 px-2 rounded-full"
          >
            Login
          </button>
          <button
            onClick={navigateToSignup}
            className="bg-[#5adae0] hover:bg-[#36e2ec] text-black font-semibold py-1 px-2 rounded-full"
          >
            Signup
          </button></div>}</div></nav>
      <nav className='max-md:hidden w-[90%] h-[10%] m-auto flex items-center justify-between'><ul className='flex'><li className='list-none relative text-[13px] text-white mr-[25px] cursor-pointer ease-linear duration-300 hover:text-white'>DISCOVER<span className='absolute w-full h-[2.5px] bg-[#36e2ec] bottom-[-5px] left-0 rounded-[20px]'></span></li><li className='hover:text-white list-none relative text-[13px] text-[#4c5262] mr-[25px] cursor-pointer ease-linear duration-300'>MY LIBRARY</li><li className='hover:text-white list-none relative text-[13px] text-[#4c5262] mr-[25px] cursor-pointer ease-linear duration-300'>PODCASTS</li></ul>
        <div className='search relative w-[25%] h-[35px] border border-solid border-white rounded-[20px] flex items-center justify-between text-gray-400'><BsSearch className='text-[25px] cursor-pointer p-[0px_0px_0px_10px] hover:text-white'  /><input type="text" name="search" id="search" placeholder='Search Song...' /><div className='search_results absolute w-full h-[200px] rounded-[10px] mt-[240px] overflow-auto'><a href="" className='card w-full min-h-[45px] flex items-center bg-[#6969AA1A] mb-[5px]'><Image src={melodyAiImage} alt='/' className='ml-[5px] w-[35px] h-[35px] rounded-[5px]'></Image><div className="content w-[70%] ml-[10px] h-[100%] p-0 text-[13px] font-medium text-white">On My Way <div className='subtitle text-[10px] text-[#a4a8b4] font-normal'>Alan Walker</div></div></a></div></div>
        {user.value && <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}} className='user relative w-[30px] h-[30px] border border-solid border-white rounded-[50%]'>{dropdown && <div onMouseOver={()=>{setdropdown(true)}} onMouseLeave={()=>{setdropdown(false)}} className='absolute right-2 bg-slate-800 top-7 rounded-md px-5 w-36'><ul><li className='py-1 hover:text-[#5adae0] text-sm cursor-pointer'>My Account</li><li onClick={Logout} className='py-1 hover:text-[#5adae0] text-sm cursor-pointer'>Logout</li></ul></div>}<div className='w-full h-full rounded-[50%] shadow-[2px_2px_8px_#121213] text-center bg-[#36e2ec] text-lg '>{newUser && newUser.name ? newUser.name[0].toUpperCase() : ''}</div></div>}
        {!user.value && <div className="flex justify-center space-x-2">
          <button
            onClick={navigateToLogin}
            className="bg-[#36e2ec] hover:bg-[#5adae0] text-black font-semibold py-1 px-2 rounded-full"
          >
            Login
          </button>
          <button
            onClick={navigateToSignup}
            className="bg-[#5adae0] hover:bg-[#36e2ec] text-black font-semibold py-1 px-2 rounded-full"
          >
            Signup
          </button></div>}
      </nav>
      {selectedArtist ? (<><div className="content w-[90%] h-[30%] m-auto max-md:mt-4"><h1 className='text-[25px] font-semibold'>{selectedArtist.artist}</h1><p className='text-[11px] md:text-[16px] font-normal text-[#4c5262] m-[5px]'>{selectedArtist.Desc}</p><div className="buttons"><button className='w-[130px] h-[30px] border-2 border-solid border-[#36e2ec] outline-none rounded-[20px] bg-[#5adae0] text-white cursor-pointer duration-300 ease-linear'>PLAY</button><button className='w-[130px] h-[30px] border-2 border-solid border-[#36e2ec] outline-none rounded-[20px] bg-[#5adae0] text-white cursor-pointer duration-300 ease-linear ml-1'>FOLLOW</button></div></div><div className="popular_songs w-[90%] h-auto m-auto max-md:mt-4">
        <div className='flex items-center justify-between'><h4>Popular Songs</h4><div className="btn_s flex items-center justify-between w-[38px]"><BsArrowLeftCircleFill onClick={() => scrollLeft(popSongsRef)} className='text-[#a4a8b4] cursor-pointer ease-linear duration-300 hover:text-white' /><BsArrowRightCircleFill onClick={() => scrollRight(popSongsRef)} className='text-[#a4a8b4] cursor-pointer ease-linear duration-300 hover:text-white'/></div></div>
          <div ref={popSongsRef} className="pop_songs w-[100%] h-[150px] mt-[15px] flex overflow-auto">
            {selectedArtist?.Alistsongs?.map((song) => (
              <li key={song._id} onClick={() => handlePlayPauseClick(song.audio,song)} className="songItem min-h-[100px] h-[140px] list-none mr-[10px] ease-linear duration-300 hover:bg-[#6969AA1A]">
                  <div className="img_play relative w-[100px] h-[100px] flex items-center justify-center">
                    <img src= {song.image} alt= {song.songname} className='w-full h-full rounded-[10px] overflow-hidden'></img>
                    {playSongName === song.audio && isPlaying ? (
              <BsPauseCircleFill
                className="bi absolute text-[20px] cursor-pointer ease-linear duration-300 opacity-0 text-white hover:opacity-100"
              />
            ) : (
              <BsPlayCircleFill
                className="bi absolute text-[20px] cursor-pointer ease-linear duration-300 opacity-0 text-white hover:opacity-100"
              />
            )}
                  </div>
                  <h5 className='p-[5px_0px_0px_5px] leading-[15px] text-[11px] w-[100px] overflow-hidden whitespace-nowrap text-ellipsis'>{song.songname}
                    <br />
                    <div className="subtitle text-[9px] text-[#4c5262] overflow-hidden whitespace-nowrap text-ellipsis">{song.artist}</div>
                  </h5>
                </li>
            ))}
          </div>
      </div></>):(<><div className="content w-[90%] h-[30%] m-auto max-md:mt-4"><h1 className='text-[25px] font-semibold'>Welcome to Melody AI</h1><p className='text-md font-normal text-[#4c5262] m-[5px] text-pretty max-md:hidden'>Dive into the ultimate music experience with Melody AI. Discover new tracks, listen to your favorite songs, and explore curated playlists. Our advanced AI recommends music tailored to your taste. Stay updated with the latest hits and enjoy seamless streaming. Join us to elevate your musical journey and find the soundtrack to your life.</p><p className='text-md font-normal text-[#4c5262] m-[5px] text-pretty md:hidden'>Dive into the ultimate music experience with Melody AI. Discover new tracks, listen to your favorite songs, and explore curated playlists. Our advanced AI recommends music tailored to your taste.</p></div>
      <div className="popular_songs w-[90%] h-auto m-auto max-md:mt-4">
        <div className='flex items-center justify-between'><h4>Popular Songs</h4><div className="btn_s flex items-center justify-between w-[38px]"><BsArrowLeftCircleFill onClick={() => scrollLeft(popSongsRef)} className='text-[#a4a8b4] cursor-pointer ease-linear duration-300 hover:text-white' /><BsArrowRightCircleFill onClick={() => scrollRight(popSongsRef)} className='text-[#a4a8b4] cursor-pointer ease-linear duration-300 hover:text-white'/></div></div>
          <div ref={popSongsRef} className="pop_songs w-[100%] h-[150px] mt-[15px] flex overflow-auto">
            {songs.map((song) => (
              <li key={song._id} onClick={() => handlePlayPauseClick(song.audio,song)} className="songItem min-h-[100px] h-[140px] list-none mr-[10px] ease-linear duration-300 hover:bg-[#6969AA1A]">
                  <div className="img_play relative w-[100px] h-[100px] flex items-center justify-center">
                    <img src= {song.image} alt= {song.songname} className='w-full h-full rounded-[10px] overflow-hidden'></img>
                    {playSongName === song.audio && isPlaying ? (
              <BsPauseCircleFill
                className="bi absolute text-[20px] cursor-pointer ease-linear duration-300 opacity-0 text-white hover:opacity-100"
              />
            ) : (
              <BsPlayCircleFill
                className="bi absolute text-[20px] cursor-pointer ease-linear duration-300 opacity-0 text-white hover:opacity-100"
              />
            )}
                  </div>
                  <h5 className='p-[5px_0px_0px_5px] leading-[15px] text-[11px] w-[100px] overflow-hidden whitespace-nowrap text-ellipsis'>{song.songname}
                    <br />
                    <div className="subtitle text-[9px] text-[#4c5262] overflow-hidden whitespace-nowrap text-ellipsis">{song.artist}</div>
                  </h5>
                </li>
            ))}
          </div>
      </div></>)}
      
      <div className="popular_artist w-[90%] h-auto m-auto max-md:mt-4">
        <div className='flex items-center justify-between'><h4>Popular Artists</h4><div className="btn_s flex items-center justify-between w-[38px]"><BsArrowLeftCircleFill onClick={() => scrollLeft(popArtistRef)} className='text-[#a4a8b4] cursor-pointer ease-linear duration-300 hover:text-white' /><BsArrowRightCircleFill onClick={() => scrollRight(popArtistRef)} className='text-[#a4a8b4] cursor-pointer ease-linear duration-300 hover:text-white'/></div></div>
        <div ref={popArtistRef} className="pop_artist w-[100%] h-[90px] mt-[15px] flex overflow-auto">
        {artistsongs.map((artist) => (<li key={artist._id} onClick={() => handleArtistClick(artist)} className= 'list-none relative min-w-[80px] h-[80px] rounded-[50%] mr-[20px] cursor-pointer' ><img src={artist.artistimg} alt='/' className={`w-full h-full rounded-[50%] ${ selectedArtist && selectedArtist._id === artist._id ? 'border-2 border-solid border-[#36e2ec]' : 'border-2 border-solid border-[#4c5262]' } hover:border-2 hover:border-solid hover:border-white`}></img></li>))}
        </div>  
      </div>
    </div>
    </>
  )
}

export default Songs
