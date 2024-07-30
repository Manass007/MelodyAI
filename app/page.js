'use client'
import { useRouter } from 'next/navigation';
import Main from "@/components/Main";
import Songs from "@/components/Songs";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BsSkipStartFill, BsFillPlayFill, BsFillPauseFill, BsSkipEndFill, BsVolumeDownFill, BsRepeat, BsDownload } from "react-icons/bs";
import { useState, useEffect } from "react";
import LoadingBar from 'react-top-loading-bar';
import { useAudio } from '@/components/Audiocontext';

export default function Home() {
  const {
    audioFiles,
    selectedSong,
    isPlaying,
    currentTime,
    duration,
    playAudio,
    pauseAudio,
    playNext,
    playPrevious,
    handleSeek,
    handleVolumeChange,
    formatTime} = useAudio();
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem('token');
  if(token) {
    setUser({value:token});
    setKey(Math.random());
  };
}, [router.query]);


  const logout = () => {
    setProgress(100);
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
  };

  return (
    <>
      <LoadingBar
        color='#36e2ec'
        progress={progress}
        waitingTime={100}
        onLoaderFinished={() => setProgress(0)}
      />
      <Main />
      <Songs Logout={logout} setProgress={setProgress} user={user} key={key} />
      <div className='max-md:justify-between player font-poppins flex items-center px-[10px] w-full h-[13vh] bg-gray-900 shadow-[5px_0px_2px_#090f1f]'>
        <div className="flex">
        <div className={`wave max-md:w-[20px] w-[30px] h-[30px] flex items-end m-[0px_10px_0px_0px] ${isPlaying ? 'active1' : ''}`} id='wave'>
          <div className="wave1 w-[5px] h-[25px] bg-[#36e2ec] ml-[3px] mr-[3px] rounded-tl-lg rounded-tr-lg animate-unset"></div>
          <div className="wave1 w-[5px] h-[15px] bg-[#36e2ec] mr-[3px] rounded-tl-lg rounded-tr-lg"></div>
          <div className="wave1 w-[5px] h-[20px] bg-[#36e2ec] mr-[3px] rounded-tl-lg rounded-tr-lg"></div>
        </div>
        {selectedSong ? (
          <>
            <img className='w-[35px] h-[35px] ml-[7px]' src={selectedSong?.image} alt='/' id="poster_player"></img>
            <h5 className='max-md:w-[60px] w-[130px] max-md:ml-[5px] ml-[15px] text-white leading-[17px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]' id="title">
              {selectedSong?.songname}
              <div className="subtitle w-full text-[#4c5262] overflow-hidden text-ellipsis whitespace-nowrap text-[11px]">{selectedSong?.artist}</div>
            </h5>
          </>
        ) : (
          <>
            <h5 className='max-md:w-[60px] w-[130px] max-md:ml-[5px] ml-[15px] text-white leading-[17px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]' id="title">
              Let The Awesomeness Begin!
              <div className="subtitle w-full text-[#4c5262] overflow-hidden text-ellipsis whitespace-nowrap text-[11px]">By Clicking the Play Button</div>
            </h5>
          </>
        )}
        <BsMusicNoteBeamed className='text-[20px] text-white max-md:ml-5 ml-[55px] cursor-pointer outline-none max-md:flex-none self-center' />
        </div>
        {audioFiles.length > 0 && (
          <div className="max-md:top-0 max-md:left-0 icon relative left-[16.5%] top-[-10px] text-[20px] text-white max-md:ml-[10px] ml-[40px] outline-none flex items-center">
            <BsRepeat id='repeat' className='cursor-pointer text-[15px] text-[#4c5262] outline-none' />
            <BsSkipStartFill onClick={playPrevious} className='text-[25px] cursor-pointer outline-none ml-7 max-md:ml-1' id='back' />
            {isPlaying ? (
              <BsFillPauseFill onClick={pauseAudio} className='text-[40px] cursor-pointer outline-none border border-solid border-[#4c5262] rounded-full p-[1px_5px_0px_7px] m-[0px_5px]' id='pause' />
            ) : (
              <BsFillPlayFill onClick={playAudio} className='text-[40px] cursor-pointer outline-none border border-solid border-[#4c5262] rounded-full p-[1px_5px_0px_7px] m-[0px_5px]' id='play' />
            )}
            <BsSkipEndFill onClick={playNext} className='text-[26px] cursor-pointer outline-none mr-[28px] max-md:mr-1' id='next' />
            <BsDownload id='download_music' className='cursor-pointer text-[15px] text-[#4c5262] outline-none' />
          </div>
        )}
          <div className="md:hidden bar2 absolute bg-[#36e2ec] w-0 h-[87.5%] top-0 ease-linear duration-1000" id="bar2" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>

        <span className='max-md:hidden text-white relative top-[21px] right-[45px] ml-1 text-[11px] font-normal' id="current_start">{formatTime(currentTime)}</span>
        <div className="max-md:hidden bar relative top-[21px] right-[45px] w-[20%] h-[2px] bg-[#4c5262] m-[0px_15px_0px_15px]">
          <input className='absolute w-full top-[-7px] left-0 cursor-pointer z-10 opacity-0' type="range" id="seek" min="0" max="100" value={duration ? (currentTime / duration) * 100 : 0} onChange={handleSeek} />
          <div className="bar2 absolute bg-[#36e2ec] w-0 h-full top-0 ease-linear duration-1000" id="bar2" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>
          <div className="dot absolute w-[5px] h-[5px] bg-[#36e2ec] rounded-[50%] left-[0%] top-[-1.5px] ease-linear duration-100"  style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>
        </div>
        <span className='max-md:hidden text-white relative top-[21px] right-[45px] ml-1 text-[11px] font-normal' id="current_end">{formatTime(duration)}</span>
        <div className="max-md:hidden vol relative w-[10%] h-[2px] mr-2 bg-[#4c5262] ml-[20%]">
          <BsVolumeDownFill className='absolute text-white text-[25px] top-[-12px] left-[-35px]' />
          <input className='absolute w-[100%] top-[-6px] left-0 cursor-pointer opacity-0 z-10' type="range" min="0" max="100" id="vol" onChange={handleVolumeChange} />
          <div className="vol_bar absolute bg-[#36e2ec] w-[100%] h-[100%] top-0 ease-linear duration-1000"></div>
          <div className="dot absolute w-[5px] h-[5px] bg-[#36e2ec] rounded-[50%] left-[100%] top-[-1.5px] ease-linear duration-100" id="vol_dot"></div>
        </div>
      </div>
    </>
  );
}
