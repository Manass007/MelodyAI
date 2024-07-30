// app/api/getplaylists/route.js
import { NextResponse } from 'next/server';
import Playlist from '@/models/Playlist';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    const playlists = await Playlist.find();
    return NextResponse.json(playlists);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching playlists.' }, { status: 500 });
  }
}