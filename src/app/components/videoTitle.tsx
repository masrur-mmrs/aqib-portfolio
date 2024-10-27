'use client'
import React, { useState, useEffect } from 'react';
import { getVideoTitle } from '@/utils/firebaseUtils';

interface VideoTitleProps {
    videoID: string
}


const VideoTitle: React.FC<VideoTitleProps> = ({videoID}) => {
    const [videoTitle, setVideoTitle] = useState<string>('');

    useEffect(() => {
        getVideoTitle(videoID).then((data) => {
            setVideoTitle(data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <h1 className='pb-0 sm:pt-5 text-5xl font-thin'>{videoTitle.toUpperCase()}</h1>
    );
};


export default VideoTitle;