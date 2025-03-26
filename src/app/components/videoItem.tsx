'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VideoItemSkeleton from './videoItemSkeleton';
import { useQuery } from '@tanstack/react-query';
import { getThumbnail } from '@/utils/firebaseUtils';

interface videoitemProps {
  title: string;
  thumbnail: string;
  videoID: string;
}

const VideoItem: React.FC<videoitemProps> = ({ title, thumbnail, videoID }) => {
  const { data: thumbnailData, isLoading } = useQuery({
    queryKey: ["thumbnail", {thumbnail}],
    queryFn: () => getThumbnail(thumbnail),
    staleTime: 10 * 60 * 60 * 24,
  })

  if (isLoading) {
    return <VideoItemSkeleton />;
  }

  return (
    <Link href={`/video/${videoID}`} className="block">
        <Image
          src={thumbnailData!}
          alt={title}
          width={1000}
          height={700}
          unoptimized
        />
      <h2 className="absolute inset-0 flex justify-center items-center text-transparent hover:text-white text-xl font-bold hover:bg-black hover:bg-opacity-50">
        {title.toUpperCase()}
      </h2>
    </Link>
  );
};

export default VideoItem;
