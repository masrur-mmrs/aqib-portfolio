'use client';
import React, { FC } from 'react';
import VideoPlayer from '@/app/components/videoPlayer';
import VideoTitle from '@/app/components/videoTitle';
import BackButton from '@/app/components/backButton';

interface VideoPageProps {
  params: {
    video: string;
  };
}

const VideoPage: FC<VideoPageProps> = ({ params }) => {
  const { video } = params;

  return (
    <>
      <BackButton />
      <div className="flex flex-col min-h-screen justify-center items-center w-[100%] h-[100%]">
        <VideoPlayer videoURL={`https://vimeo.com/${video}`} />
        <VideoTitle videoID={video} />
      </div>
    </>
  );
};

export default VideoPage;