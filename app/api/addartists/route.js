import { NextResponse } from "next/server";
import Artist from "@/models/Artist";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req) {
    try {
      const { artist, artistimg, Desc, Alistsongs } = await req.json();
      // Check if there are at least 10 songs in the playlist
    //   if (Alistsongs.length < 10) {
    //     return NextResponse.json({ error: 'Minimum 10 songs required to create a playlist.' }, { status: 400 });
    //   }
  
      await connectToDatabase();
      const newArtist = new Artist({ artist, artistimg, Desc, Alistsongs });
      await newArtist.save();
      return NextResponse.json(newArtist);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.artist) {
        return NextResponse.json({ error: 'Artist name must be unique.' }, { status: 400 });
      }
      console.error(error);
      return NextResponse.json({ error: 'Error in creating Artist Profile.' }, { status: 500 });
    }
  }