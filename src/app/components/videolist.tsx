import React from 'react';
import VideoItem from './videoitem';
import { getVideoDocuments } from '@/utils/firebaseUtils';

const getServerSideProps = async () => {
  const videos = await getVideoDocuments();
  return videos;
}

const Videolist: React.FC = async () => {
  const videos = await getServerSideProps();

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