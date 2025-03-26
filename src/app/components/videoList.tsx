import React from 'react';
import VideoItem from './videoItem';

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC <VideoListProps> = ({ videos }) => {

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

export default VideoList;
