import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY !,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.log('error in the image-kit-auth: ');
    throw error;
  }
}