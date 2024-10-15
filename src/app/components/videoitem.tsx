'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getThumbnail } from '@/utils/firebaseUtils';
import VideoItemSkeleton from './videoItemSkeleton';

interface videoitemProps {
  title: string;
  thumbnail: string;
  videoID: string;
}

const VideoItem: React.FC<videoitemProps> = ({ title, thumbnail, videoID }) => {
  const [thumbnailData, setThumbnailData] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getThumbnail(thumbnail).then((thumbnailData) => {
      setThumbnailData(thumbnailData);
      setLoaded(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link href={`/video/${videoID}`} className="block">
        {loaded?<Image
          src={thumbnailData}
          alt={title}
          width={1000}
          height={700}
          unoptimized
        />:<VideoItemSkeleton/>}
      <h2 className="absolute inset-0 flex justify-center items-center text-transparent hover:text-white text-xl font-bold hover:bg-black hover:bg-opacity-50">
        {title}
      </h2>
    </Link>
  );
};

export default VideoItem;
