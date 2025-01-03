import { NextResponse } from 'next/server';
import axios from 'axios';

const access_token = process.env.VIMEO_CLIENT_TOKEN;

export async function POST(request: Request) {
  try {
    const { size } = await request.json();

    const vimeoResponse = await axios.post(
      'https://api.vimeo.com/me/videos',
      {
        upload: {
          approach: 'post',
          size: size,
        },
      },
      {
        headers: {
          Authorization: `bearer ${access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
        },
      }
    );

    const { upload_link } = vimeoResponse.data.upload;
    const { uri } = vimeoResponse.data;
    
    return NextResponse.json({ upload_link, uri });
  } catch (error) {
    console.error('Error creating Vimeo video:', error);
    return NextResponse.json({ error: 'Failed to create Vimeo video' }, { status: 500 });
  }
}
