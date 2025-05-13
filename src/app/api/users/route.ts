import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/connectdb";
import User from "../../../../models/Usermanagement";

//test whether a user is created  in the database
export async function POST(req:Request){

//first connect to the db
   await dbConnect();

   //destructure details from request body
   const { username, email } = await req.json();

   try{
    const user = await User.create({ username, email });
    return NextResponse.json(user, { status: 201 });
   }  

   catch {
    return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    
   }

}

//get request to get user details
export async function GET(){
 await dbConnect();

 try {
    const users = await User.find();


    return NextResponse.json(users);

  } catch  {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }



}