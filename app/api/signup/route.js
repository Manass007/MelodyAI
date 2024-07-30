import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
var CryptoJS = require("crypto-js");

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({ name, email, password: CryptoJS.AES.encrypt( password , 'secret123').toString()});
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

