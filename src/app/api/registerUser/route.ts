import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import User from "../../../../models/usermanagement";
import dbConnect from "../../../../lib/connectdb";
import { generateTokenAndSetCookie } from "../../../../utils/generateTokenandSetCookie";



export async function POST(req:Request){
//extract details from request body
try{
const{email,password,username}=await req.json();
await dbConnect();
//database connection
  //  const client = await clientPromise;
   // const db = client.db(); // default DB from connection URI
    //const usersCollection = db.collection('users');

//check whether the user exists

const existinguser=await User.findOne({email:email})

if(existinguser){

return NextResponse.json({ message: 'User already exists' }, { status: 400 });

}

//hash the password before storage

const hashedPassword = await bcrypt.hash(password, 10);


  const newUser=new User({ 
    
    email, password: hashedPassword,username
});

//await user to be saved
await newUser.save();

const response=generateTokenAndSetCookie(newUser._id.toString());
 return response;
}

catch(error){
    console.error("Registration error:",error);

  return NextResponse.json({ error: 'User creation failed' }, { status: 400 });


}


}