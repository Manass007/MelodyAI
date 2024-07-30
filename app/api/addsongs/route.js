import { NextResponse } from "next/server";
import Song from "@/models/Song";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req) {
    try {
        const songs = await req.json(); // Expecting an array of songs
        if (!Array.isArray(songs)) {
            return NextResponse.json({ error: 'Expected an array of songs.' }, { status: 400 });
        }

        await connectToDatabase();

        // Use bulkWrite to insert multiple documents with upsert
        const operations = songs.map(song => ({
          updateOne: {
              filter: { songname: song.songname },
              update: { $setOnInsert: song },
              upsert: true // Inserts if the document does not exist
          }
      }));

      const result = await Song.bulkWrite(operations);

      // Return the results
      return NextResponse.json({ insertedCount: result.upsertedCount, modifiedCount: result.modifiedCount });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error in adding songs.' }, { status: 500 });
  }
}