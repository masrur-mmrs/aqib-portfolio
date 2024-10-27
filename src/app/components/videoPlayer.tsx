import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    videoURL: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({videoURL}) => {
    return (
        <div className="!w-[100%] !h-[100%]">
            <ReactPlayer
                className="object-cover"
                url={videoURL}
                width="100%"
                controls
                playing
            />
        </div>
    );
};


export default VideoPlayer;