import React from 'react';
import VideoItemSkeleton from './videoItemSkeleton';

const VideoListSkeleton: React.FC = ({}) => {
    return (
        <>
            <VideoItemSkeleton />
            <VideoItemSkeleton />
            <VideoItemSkeleton />
            <VideoItemSkeleton />
        </>
    );
};


export default VideoListSkeleton;