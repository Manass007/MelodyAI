import { NextResponse } from "next/server";
import Playlist from "@/models/Playlist";
import connectToDatabase from "@/lib/mongodb";

export async function PATCH(req) {
  try {
    const { playlist, pimage, plistsongs } = await req.json();

    // Ensure the provided playlist name and plistsongs array are valid
    if (!playlist || !pimage  || !Array.isArray(plistsongs) || plistsongs.length === 0) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
    }

    await connectToDatabase();

    // Find the playlist by name
    const existingPlaylist = await Playlist.findOne({ playlist });

    if (!existingPlaylist) {
      return NextResponse.json({ error: 'Playlist not found.' }, { status: 404 });
    }

    // Update the playlist image
    existingPlaylist.pimage = pimage;

    // Update existing songs and/or add new songs to the playlist
    plistsongs.forEach((song) => {
      const songIndex = existingPlaylist.plistsongs.findIndex((s) => s.songname === song.songname);

      if (songIndex > -1) {
        // Update the existing song details
        existingPlaylist.plistsongs[songIndex] = song;
      } else {
        // Add the new song to the playlist
        existingPlaylist.plistsongs.push(song);
      }
    });

    // Save the updated playlist
    await existingPlaylist.save();

    return NextResponse.json(existingPlaylist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating playlist.' }, { status: 500 });
  }
}
