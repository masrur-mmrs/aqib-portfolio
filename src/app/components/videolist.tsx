'use client';
import React, { useState, useEffect } from 'react';
import VideoItem from './videoitem';
import { getVideoDocuments } from '@/utils/firebaseUtils';
import VideoListSkeleton from './videoListSkeleton';
// Define an interface for the video object
interface Video {
  videoID: string;
  videoTitle: string;
  thumbnail: string;
  videoURL: string;
}



const Videolist: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getVideoDocuments().then((videoData) => {
      setVideos(videoData);
      setIsLoading(false);
    });
  },[]);


  return (
      <ul className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
       {isLoading ? <VideoListSkeleton /> : videos.map((video) => (
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