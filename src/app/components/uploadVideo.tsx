"use client";
import React, { useState } from "react";
import { FileInput, TextInput, Label, Button, Spinner } from "flowbite-react";
import { createVideoDocument } from "@/utils/firebaseUtils";
interface ThumbnailData {
    start_time: string;
    duration: string;
}

interface Video {
    videoID: string;
    videoTitle: string;
    thumbnail: string;
    videoURL: string;
}

const UploadVideo: React.FC = ({}) => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailData, setThumbnailData] = useState<ThumbnailData>({"start_time": "0", "duration": "2"});
    const [video, setVideo] = useState<Video>({videoID: "", videoTitle: "", thumbnail: "", videoURL: ""});
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setVideoFile(event.target.files[0]);
        }
    };

    const handleThumbnailDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setThumbnailData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setVideo(prevData => ({
            ...prevData,
            [e.target.id]: e.target.value
        }));
    }

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsUploading(true);
        if (videoFile && video.videoTitle !== "") {
            const formData = new FormData();
            formData.append('videoTitle', video.videoTitle);
            formData.append('startTime', thumbnailData.start_time);
            formData.append('duration', thumbnailData.duration);
            formData.append('video', videoFile);


            // const fetchURL = 'http://127.0.0.1:5001/aqib-portfolio-c8593/us-central1/generateGifThumbnail';
            const fetchURL = 'https://us-central1-aqib-portfolio-c8593.cloudfunctions.net/generateGifThumbnail';

            const response = await fetch('/api/uploadVideo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  size: videoFile.size,
                }),
              });
        
              const { upload_link, uri } = await response.json();
              setVideo({
                ...video,
                videoID: uri.split('/videos/')[1],
                videoURL: "https://vimeo.com/"+uri.split('/videos/')[1],
              })
        
              const vimeoFormData = new FormData();
              vimeoFormData.append('file_data', videoFile);
        
              await fetch(upload_link, {
                method: 'POST',
                body: vimeoFormData,
              });
    
            try {
                console.log('Sending request to Cloud Function');
                const response = await fetch(fetchURL, {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                });
    
                if (!response.ok) {
                    const errorData = await response.text();
                    console.error(`HTTP error! status: ${response.status}, body: ${errorData}`);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.text();
                console.log('GIF creation response:', data);
                setVideo(prevVideo => ({...prevVideo, thumbnail: data}));
            } catch (error) {
                console.error('Error uploading video:', error);
            }
            if (video.videoID !== "") {
                await createVideoDocument(video);
                console.log(video);
            }
            setIsUploading(false);
            alert("Video uploaded successfully ✅");
            setVideoFile(null);

        } else {
            console.error("No video file selected");
        }
    }

    return (
        <div className="flex flex-col gap-2 border-l-2 border-r-2 border-white px-10">
            <div className="mb-2 block">
                <Label color="light" htmlFor="video" value="Upload Video" />
            </div>
            <FileInput 
                id="dropzone-file" 
                onChange={handleFileChange}
                accept="video/mp4,video/x-m4v,video/*"
                color={videoFile!==null ? "info" : "gray"}
            />
            <Label color="light" htmlFor="title" value="Video title:" />
            <TextInput
                    id="videoTitle"
                    type="text"
                    sizing="md"
                    placeholder='Title*'
                    required
                    value={video.videoTitle}
                    onChange={handleVideoChange}
                />
            {videoFile!==null && <div>
                <Label color="light" htmlFor="start_time" value="Thumbnail start time:" />
                <TextInput
                    id="start_time"
                    type="text"
                    sizing="sm"
                    placeholder='Start Time'
                    value={thumbnailData.start_time}
                    onChange={handleThumbnailDataChange}
                />
                <Label color="light" htmlFor="duration" value="Thumbnail duration:" />
                <TextInput
                    id="duration"
                    type="text"
                    sizing="sm"
                    placeholder='Duration'
                    value={thumbnailData.duration}
                    onChange={handleThumbnailDataChange}
                />
            </div>}

            <Button 
                className="mt-4" 
                color="blue"
                onClick={(e: React.MouseEvent<HTMLButtonElement>)=>handleUpload(e)}
                disabled={!videoFile}
            >
            {isUploading && <Spinner aria-label="Spinner button example" size="sm" className="mr-3"/>}
                Upload Video
            </Button>
        </div>
    );
};


export default UploadVideo;