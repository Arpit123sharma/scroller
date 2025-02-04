import {NextRequest, NextResponse} from 'next/server'
import connectDB from '@/utils/dbconnection'
import User from '@/models/user.models'

export async function POST(req:NextRequest){
    try {
        const {email, password} = await req.json();
        if(!email.trim() || !password.trim()){
            return NextResponse.json(
                {error:"email and password field is required", success:false},
                {status:400}
            )
        }

        await connectDB();

        const isUserAlreadyExists = await User.findOne({email});
        if(isUserAlreadyExists){
            return NextResponse.json(
                {error:"email already exists", success:false},
                {status:400}
            )
        }

        const user = await User.create({
            email: email,
            password: password
        })

        return NextResponse.json(
            {message:"user creted successfully", success:true,user},
            {status:201}
        ) 
    } catch (error) {
        console.log('error occured while registering user :: ',error);
        
        return NextResponse.json(
            {error:"error occured while registering user", success:false},
            {status:500}
        )
    }
}