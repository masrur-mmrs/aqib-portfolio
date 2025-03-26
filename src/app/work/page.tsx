import React from 'react';
import VideoList from '../components/videoList';
import { getVideoDocuments } from '@/utils/firebaseUtils';

export const dynamic = "force-dynamic";

const WorkPage = async () => {
    const videos: Video[] = await getVideoDocuments();
    return (
        <>
            <VideoList videos={videos}/>
        </>
    );
}

export default WorkPage;