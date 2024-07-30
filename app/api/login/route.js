import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    const bytes  = CryptoJS.AES.decrypt(user.password, 'secret123');
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (!user || decryptedPass !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    var token = jwt.sign({ email:user.email, name:user.name }, 'jwtsecret', {expiresIn: "1m"});
    // console.log(token);
    return NextResponse.json({succes:true, token});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}

