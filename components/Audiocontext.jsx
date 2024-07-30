'use client'
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { listAudioFiles } from "@/lib/firebase";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [playSongName, setPlaySongName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

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
    const fetchAudioFiles = async () => {
      const audioUrls = await listAudioFiles();
      setAudioFiles(audioUrls);
    };

    fetchAudioFiles();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentTrack && audio) {
      if (audio.src !== currentTrack.url) {
        audio.src = currentTrack.url;
        audio.load();
      }
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
        if (isPlaying) {
          audio.play().catch(error => {
            console.error('Error playing the audio:', error);
          });
        }
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        if (audio.currentTime === audio.duration) {
          setIsPlaying(false);
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });
      };
    }
  }, [currentTrack]);

  const playAudio = () => {
    const audio = audioRef.current;
    if (selectedSong) {
      audio.play().catch(error => {
        console.error('Error playing the audio:', error);
      });
      setIsPlaying(true);
    } else {
      const randomIndex = Math.floor(Math.random() * audioFiles.length);
      const randomSong = audioFiles[randomIndex];
      const matchedSong = songs.find((song) => song.audio === randomSong.name);
      if (matchedSong) {
        setCurrentTrack(randomSong);
        setIsPlaying(true);
        setPlaySongName(matchedSong.audio);
        setSelectedSong(matchedSong);
      }
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const playNext = () => {
    if (audioFiles.length > 0) {
      const nextIndex = (audioFiles.indexOf(currentTrack) + 1) % audioFiles.length;
      const nextSong = audioFiles[nextIndex];
      const matchedSong = songs.find((song) => song.audio === nextSong.name);
      if (matchedSong) {
        setCurrentTrack(nextSong);
        setIsPlaying(true);
        setPlaySongName(matchedSong.audio);
        setSelectedSong(matchedSong);
      }
  };
}

  const playPrevious = () => {
    if (audioFiles.length > 0) {
      const prevIndex = (audioFiles.indexOf(currentTrack) - 1 + audioFiles.length) % audioFiles.length;
      const prevSong = audioFiles[prevIndex];
      const matchedSong = songs.find((song) => song.audio === prevSong.name);
      if (matchedSong) {
        setCurrentTrack(prevSong);
        setIsPlaying(true);
        setPlaySongName(matchedSong.audio);
        setSelectedSong(matchedSong);
      }
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const seekTime = (event.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (event) => {
    const audio = audioRef.current;
    const volume = event.target.value / 100;
    audio.volume = volume;

    const volumeDot = document.getElementById("vol_dot");
    const volumeBar = document.querySelector(".vol_bar");
    volumeDot.style.left = `${volume * 100}%`;
    volumeBar.style.width = `${volume * 100}%`;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSongFromFirebaseStorage = (songName, song) => {
    const matchedSong = audioFiles.find((song) => song.name === songName);
    if (matchedSong) {
      setCurrentTrack(matchedSong);
      setIsPlaying(true);
      setPlaySongName(songName);
      setSelectedSong(song);
    } else {
      console.log(`Song "${songName}" not found.`);
    }
  };

  const value = {
    selectedSong,
    playSongName,
    audioRef,
    audioFiles,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playAudio,
    pauseAudio,
    playNext,
    playPrevious,
    handleSeek,
    handleVolumeChange,
    setCurrentTrack,
    formatTime,
    playSongFromFirebaseStorage,
  };

  return (
    <AudioContext.Provider value={value}>
      <audio ref={audioRef} onTimeUpdate={() => {
              if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
              }
            }} />
      {children}
    </AudioContext.Provider>
  );
};
