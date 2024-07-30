import { NextResponse } from 'next/server';
import Artist from '@/models/Artist';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    const artists = await Artist.find();
    return NextResponse.json(artists);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching artists.' }, { status: 500 });
  }
}