'use client';
import React, { useState, useEffect } from 'react';
import { getVideoDocuments, deleteVideoDocument, deleteThumbnail } from '@/utils/firebaseUtils';
import { Checkbox, Label, Button } from "flowbite-react";
import { get } from 'http';

interface Video {
    videoID: string;
    videoTitle: string;
    thumbnail: string;
    videoURL: string;
}

const DeleteVideo: React.FC = ({}) => {
    const [videoList, setvideoList] = useState<Video[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

    useEffect(() => {
        getVideoDocuments().then((data) => {
            setvideoList(data);
        });
    }, []);

    const handleDelete = async () => {
        for (let i = 0; i < selectedVideos.length; i++) {
            const videoID = selectedVideos[i];
    
            // Find the video in the videoList by matching the videoID
            const video = videoList.find((v) => v.videoID === videoID);
    
            if (video) {
                const { thumbnail } = video; // Extract the thumbnail
                console.log(`Deleting thumbnail: ${thumbnail}`);
                await deleteThumbnail(thumbnail);
                console.log(`Deleting video with ID: ${videoID}`);
                await deleteVideoDocument(videoID);
                getVideoDocuments().then((data) => {
                    setvideoList(data);
                })
            } else {
                console.error(`Video with ID ${videoID} not found!`);
            }
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedVideos([...selectedVideos, value]);
        } else {
            setSelectedVideos(selectedVideos.filter((id) => id !== value));
        }
    };

    return (
        <div>
            <h1>Select videos to delete</h1>
            {videoList.length === 0 && <p>No videos found</p>}
            {videoList.length > 0 && <ul className="p-5 grid grid-cols-1 my-5 gap-1 border-2 border-white rounded-md">
                {videoList.map((video: any) => (
                    <li key={video.videoID}>
                        <Checkbox id={video.videoID} name={video} value={video.videoID} color="blue" onChange={handleCheckboxChange}/>
                        <Label color='light' value={video.videoTitle.toUpperCase()} className="pl-3"/>
                    </li>
                ))}
            </ul>}
            <Button color="failure" onClick={handleDelete} disabled={selectedVideos.length === 0}>Delete</Button>
        </div>
    );
};


export default DeleteVideo;