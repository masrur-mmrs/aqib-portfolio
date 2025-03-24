'use client'
import React from 'react';
import VideoItem from './videoitem';
import { fetchVideoData } from '@/utils/fetchHelper';
import { useQuery } from '@tanstack/react-query';

const Videolist: React.FC = () => {
  const {data: videos} = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideoData,
  })

  return (
      <ul className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
       {videos?.map((video) => (
        <li key={video.videoID} className="relative">
          <VideoItem
            title={video.videoTitle}
            thumbnail={video.thumbnail}
            videoID={video.videoID}
          />
        </li>
      ))}
      </ul>
  );
};

export default Videolist;