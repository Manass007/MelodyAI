import React, { useEffect, useState } from "react";
import { HiMusicalNote } from "react-icons/hi2";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useAudio } from '@/components/Audiocontext';

const Main = () => {
  const {playSongFromFirebaseStorage, playSongName, isPlaying, playAudio, pauseAudio } = useAudio();
  // const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("https://melody-ai-1-0.vercel.app/api/getplaylists"); // Adjust the API endpoint as needed
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBackClick = () => {
    setSelectedPlaylist(null);
  };

  const handlePlayPauseClick = (songName, song) => {
    if (playSongName === songName && isPlaying) {
      // console.log(playingSong);
      pauseAudio();
    } else {
      playSongFromFirebaseStorage(songName, song);
      playAudio();
      // console.log(playingSong);
    }
  };

  return (
    <div className="max-md:hidden menu_side w-1/4 h-[87vh] bg-gray-900 shadow-[5px_0px_2px_#090f1f] text-white font-poppins">
      {selectedPlaylist ? (
        <div>
          <div className="playlist mt-4 ml-5">
          <h1 className="text-xl font-semibold mt-3.5 ml-5 cursor-pointer" onClick={handleBackClick}>
            Back to Playlists
          </h1>
          </div>
          <div className="menu_song w-full h-[30rem] mt-2 overflow-auto">
            {selectedPlaylist.plistsongs.map((song, index) => (
              <li
                key={index} onClick={() => handlePlayPauseClick(song.audio, song)}
                className="songItem list-none relative p-[5px_0px_5px_20px] flex items-center mb-[10px] cursor-pointer duration-300 ease-linear hover:bg-[#696969] hover:bg-opacity-10"
              >
                <span className="text-[12px] text-[#4c5262] font-semibold">{index + 1}</span>
                <img className="w-[35px] h-[35px] ml-[25px]" src={song.image} alt={song.songname} />
                <h5 className="text-[11px] ml-[15px] w-[185px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {song.songname}
                  <br />
                  <div className="subtitle text-[9px] text-[#4c5262]">{song.artist}</div>
                </h5>
                {playSongName === song.audio && isPlaying ? (<BsPauseCircleFill className="w-[16px] h-[25px] flex-none md:mr-2" id="1" />) : (<BsPlayCircleFill className="w-[16px] h-[25px] flex-none md:mr-2" id="2" /> )}
              </li>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold mt-3.5 ml-5">playlist</h1>
          <div className="playlist mt-4 ml-5">
            <h4 className="active text-[#36e2ec] flex text-[17px] font-normal items-center cursor-pointer pb-[5px] hover:text-[#fff] ease-linear duration-300">
              <span className=" hidden relative mr-[28px] w-[10px] h-[10px] border-2 border-gray-700 rounded-full top-0 ease-linear duration-300"></span>
              <HiMusicalNote className="flex mr-5" />
              playlist
            </h4>
            <h4 className="text-[#4c5262] flex text-[17px] font-normal items-center cursor-pointer pb-[5px] hover:text-[#fff] ease-linear duration-300">
              <span></span>Recently played
            </h4>
            <h4 className="text-[#4c5262] flex text-[17px] font-normal items-center cursor-pointer pb-[5px] hover:text-[#fff] ease-linear duration-300">
              <span></span>Recommended
            </h4>
          </div>
          <div className="menu_song w-full h-[365px] mt-2 overflow-auto">
            {playlists.map((playlist, index) => (
              <li
                key={playlist._id}
                className="songItem list-none relative p-[5px_0px_5px_20px] flex items-center mb-[10px] cursor-pointer duration-300 ease-linear hover:bg-[#696969] hover:bg-opacity-10"
                onClick={() => handlePlaylistClick(playlist)}
              >
                <span className="text-[12px] text-[#4c5262] font-semibold">{index + 1}</span>
                <img className="w-[35px] h-[35px] ml-[25px]" src={playlist.pimage} alt="/" />
                <h5 className="text-[11px] ml-[15px] w-[185px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {playlist.playlist}
                  <br />
                  <div className="subtitle text-[9px] text-[#4c5262]">Playlist</div>
                </h5>
                <BsPlayCircleFill className="w-[16px] h-[25px] flex-none md:mr-2" id="1" />
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
