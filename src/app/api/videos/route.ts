import Video, { IVideo } from "@/models/video.models";
import connectDB from "@/utils/dbconnection";
import { authOptions } from "@/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await connectDB();
        const videos = await Video.find({}).sort({createdAt:-1}).lean();
        if(!videos || videos.length === 0){
            return NextResponse.json([],{status:200});
        }
        return NextResponse.json(videos);
    } catch (error) {
        console.log('Error while fetching videos:: ',error);
        return NextResponse.json(
            {error:"failed to fetch videos"},
            {status:500}
        )
    }
}

export async function POST(req:NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"unAuthorised"},{status:401});
        }
        await connectDB();
        const body:IVideo = await req.json();

        if(
            !body.title ||
            !body.videoUrl || 
            !body.thumbnailUrl || 
            !body.description 

        ){
            return NextResponse.json({error:"Missing required fields"},{status:400});
        }

        const videoData = {
            ...body,
            controls:body.controls ?? true,
            transformation:{
                height:1920,
                width:1080,
                quality:body?.transformations.quality ?? 100
            }
        }

        const createdVideo = await Video.create(videoData);

        return NextResponse.json(createdVideo);
    } catch (error) {
        console.log('Error while creating videos :: ',error);
        return NextResponse.json(
            {error:"failed to fetch videos"},
            {status:500}
        )
    }
}