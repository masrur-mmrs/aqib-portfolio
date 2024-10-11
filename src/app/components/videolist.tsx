'use client';
import React, { useState, useEffect } from 'react';
import VideoItem from './videoitem';
import { getVideoDocuments } from '@/utils/firebaseUtils';
// import output1 from "../../../public/output1.gif"
// import output2 from "../../../public/output2.gif"
// import output3 from "../../../public/output3.gif"

// Define an interface for the video object
interface Video {
  videoID: string;
  videoTitle: string;
  thumbnail: string;
  videoURL: string;
}

// export const videos: Video[] = [
//   {
//     title: "Drops",
//     thumbnail: output1,
//     videoURL: "1017645028",
//   },
//   {
//     title: "Microscope",
//     thumbnail: output2,
//     videoURL: "1017645028",
//   },
//   {
//     title: "Scientist",
//     thumbnail: output3,
//     videoURL: "1017645028",
//   },
// ];

const Videolist: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    updateVideos();
  }, [videos]);

  const updateVideos = async () => {
    const videos = await getVideoDocuments();
    setVideos(videos);
  }

  return (
      <ul className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => (
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