import { NextResponse } from "next/server";
import Song from "@/models/Song";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
    try {
      await connectToDatabase();
      const songs = await Song.find({});
      return NextResponse.json(songs);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error fetching songs' }, { status: 500 });
    }
  }
