'use client'
import React, { useState } from 'react';
import { Checkbox, Label, Button, Spinner } from "flowbite-react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVideoDocuments, deleteVideoDocument, deleteThumbnail } from '@/utils/firebaseUtils';

interface Video {
    videoID: string;
    videoTitle: string;
    thumbnail: string;
    videoURL: string;
}

interface DeleteVideoProps {
    initailVideoDocuments: Video[];
}

const DeleteVideo: React.FC<DeleteVideoProps> = ({initailVideoDocuments}) => {
    const queryClient = useQueryClient();
    const { data: videoDocuments, isLoading } = useQuery({
        queryKey: ["videoDocuments"],
        queryFn: getVideoDocuments,
        initialData: initailVideoDocuments
    }) as { data: Video[], isLoading: boolean };

    const [videoList, setvideoList] = useState<Video[]>(videoDocuments);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

    const deleteVideo = async () => {
        for (let i = 0; i < selectedVideos.length; i++) {
            const videoID = selectedVideos[i];
    
            const video = videoList.find((v) => v.videoID === videoID);
    
            if (video) {
                const { thumbnail } = video;
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

    const mutation = useMutation({
        mutationFn: deleteVideo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["videoDocuments"]})
    })

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate();
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedVideos([...selectedVideos, value]);
        } else {
            setSelectedVideos(selectedVideos.filter((id) => id !== value));
        }
    };

    if (isLoading) return <Spinner size="lg" color="blue"/>

    return (
        <form
        onSubmit={handleDelete}
        >
            <h1>Select videos to delete</h1>
            {videoList.length === 0 && <p>No videos found</p>}
            {videoList.length > 0 && <ul className="p-5 grid grid-cols-1 my-5 gap-1 border-2 border-white rounded-md">
                {videoList.map((video: Video) => (
                    <li key={video.videoID}>
                        <Checkbox id={video.videoID} name={video.videoID} value={video.videoID} color="blue" onChange={handleCheckboxChange}/>
                        <Label color='light' value={video.videoTitle.toUpperCase()} className="pl-3"/>
                    </li>
                ))}
            </ul>}
            <Button 
                type="submit" 
                color="failure" 
                disabled={ selectedVideos.length === 0 || mutation.isPending }
            >
            {mutation.isPending && <Spinner aria-label="Spinner button example" size="sm" className="mr-3"/>}
                Delete
            </Button>
        </form>
    );
};


export default DeleteVideo;