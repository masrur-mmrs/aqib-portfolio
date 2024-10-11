'use client';
import React, { FC, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { getVideoTitle } from '@/utils/firebaseUtils';
import { useRouter } from 'next/navigation';

interface VideoPageProps {
  params: {
    video: string;
  };
}

const VideoPage: FC<VideoPageProps> = ({ params }) => {
  const { video } = params;
  const router = useRouter();
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoURL, setVideoURL] = useState<string>('');
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setVideoURL(`https://vimeo.com/${video}`);
    setIsHydrated(true);
    getVideoTitle(video).then((data) => {
      setVideoTitle(data);
    })
  }, []);

  return (
    <>
      <button className="p-3" onClick={() => router.back()}>◀ Back</button>
      <div className="flex flex-col min-h-screen justify-center items-center min-w-max ">
      {isHydrated && <h1 className='pb-0 sm:pb-5 text-5xl font-thin'>{videoTitle.toUpperCase()}</h1>}
        {isHydrated && <ReactPlayer
              url={videoURL}
              width="100%"
              controls
              playing
          />}
      </div>
    </>
  );
};

export default VideoPage;