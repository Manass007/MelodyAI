import React from 'react'
import img1 from '../public/assets/11.jpg'
import Image from 'next/image';
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BsSkipStartFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { BsSkipEndFill } from "react-icons/bs";
import { BsVolumeDownFill } from "react-icons/bs";
import { BsRepeat } from "react-icons/bs";
import { BsRepeat1 } from "react-icons/bs";
import { BsShuffle } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

const Player = () => {
  return (
    <div className='player font-poppins flex items-center px-[10px] w-full h-[13vh] bg-gray-900 shadow-[5px_0px_2px_#090f1f]'>
      <div className="wave w-[30px] h-[30px] flex items-end m-[0px_10px_0px_0px]" id='wave'>
        <div className="wave1 w-[5px] h-[25px] bg-[#36e2ec] ml-[3px] mr-[3px] rounded-tl-lg rounded-tr-lg animate-unset"></div>
        <div className="wave1 w-[5px] h-[15px] bg-[#36e2ec] mr-[3px] rounded-tl-lg rounded-tr-lg"></div>
        <div className="wave1 w-[5px] h-[20px] bg-[#36e2ec] mr-[3px] rounded-tl-lg rounded-tr-lg"></div>
      </div>
      <Image className='w-[35px] h-[35px] ml-[7px]' src={img1} alt='/' id="poster_player"></Image>
      <h5 className='w-[130px] ml-[15px] text-white leading-[17px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px]' id="title">
        vande mataram
        <div className="subtitle w-full text-[#4c5262] overflow-hidden text-ellipsis whitespace-nowrap text-[11px]">Bankim Chandra</div>
      </h5>
      <BsMusicNoteBeamed className='text-[20px] text-white ml-[55px] cursor-pointer outline-none'  />
      <div className="icon relative left-[16.5%] top-[-10px] text-[20px] text-white ml-[40px] outline-none flex items-center"><BsRepeat id='repeat' className='cursor-pointer text-[15px] text-[#4c5262] outline-none' /><BsSkipStartFill className='text-[25px] cursor-pointer outline-none ml-7' id='back' /> <BsFillPlayFill className=' text-[40px] cursor-pointer outline-none border border-solid border-[#4c5262] rounded-full p-[1px_5px_0px_7px] m-[0px_5px]' id='play' /> <BsSkipEndFill className='text-[26px] cursor-pointer outline-none mr-[28px]' id='next' /> <BsDownload id='download_music' className='cursor-pointer text-[15px] text-[#4c5262] outline-none' /> </div>
      <span className='text-white relative top-[21px] right-[45px] ml-1 text-[11px] font-normal' id="current_start">0:00</span>
      <div className="bar relative top-[21px] right-[45px] w-[20%] h-[2px] bg-[#4c5262] m-[0px_15px_0px_15px]">
        <input className='absolute w-full top-[-7px] left-0 cursor-pointer z-10 opacity-0' type="range" id="seek" min="0" max="100" ></input>
        <div className="bar2 absolute bg-[#36e2ec] w-0 h-full top-0 ease-linear duration-1000" id="bar2"></div>
        <div className="dot absolute w-[5px] h-[5px] bg-[#36e2ec] rounded-[50%] left-[0%] top-[-1.5px] ease-linear duration-100"></div>
      </div>
      <span className='text-white relative top-[21px] right-[45px] ml-1 text-[11px] font-normal' id="current_end">0:30</span>
      {/* <BsRepeat id='repeat' className='cursor-pointer text-[20px] text-white outline-none m-[0px_5px_0px_15px] overflow-hidden flex items-center w-[27.5px]'/> */}
      {/* <BsDownload id='download_music' className='cursor-pointer text-[20px] text-white outline-none ml-[15px]' /> */}
      <div className="vol relative w-[10%] h-[2px] bg-[#4c5262] ml-[20%]">
        <BsVolumeDownFill className='absolute text-white text-[25px] top-[-12px] left-[-35px]' />
        <input className='absolute w-[100%] top-[-6px] left-0 cursor-pointer opacity-0 z-10' type="range" min="0" max="100" id="vol"></input>
        <div className="vol_bar absolute bg-[#36e2ec] w-[100%] h-[100%] top-0 ease-linear duration-1000"></div>
        <div className="dot absolute w-[5px] h-[5px] bg-[#36e2ec] rounded-[50%] left-[100%] top-[-1.5px] ease-linear duration-100" id="vol_dot"></div>
      </div>
    </div>
  )
}

export default Player
