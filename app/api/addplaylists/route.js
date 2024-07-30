import { NextResponse } from "next/server";
import Playlist from "@/models/Playlist";
import connectToDatabase from "@/lib/mongodb";


export async function POST(req) {
    try {
      const { playlist, pimage, plistsongs } = await req.json();
      // Check if there are at least 10 songs in the playlist
      if (plistsongs.length < 10) {
        return NextResponse.json({ error: 'Minimum 10 songs required to create a playlist.' }, { status: 400 });
      }
  
      await connectToDatabase();
      const newPlaylist = new Playlist({ playlist, pimage, plistsongs });
      await newPlaylist.save();
      return NextResponse.json(newPlaylist);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.playlist) {
        return NextResponse.json({ error: 'Playlist name must be unique.' }, { status: 400 });
      }
      console.error(error);
      return NextResponse.json({ error: 'Error in adding songs in playlist.' }, { status: 500 });
    }
  }