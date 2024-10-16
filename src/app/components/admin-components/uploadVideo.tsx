'use client'
import React, { useState } from "react";
import { FileInput, TextInput, Label, Button, Spinner } from "flowbite-react";
import { createVideoDocument } from "@/utils/firebaseUtils";

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

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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
              console.log(upload_link, uri);
              setVideo(prevVideo => {
                const updatedVideo = {
                  ...prevVideo,
                  videoID: uri.split('/videos/')[1],
                  thumbnail: video.videoTitle.replaceAll(" ", "_")+"Thumbnail.gif",
                  videoURL: "https://vimeo.com/"+uri.split('/videos/')[1],
                };
                if (updatedVideo.thumbnail !== "" && updatedVideo.videoID !== "" && updatedVideo.videoURL !== "") {
                    createVideoDocument(updatedVideo).then(() => {
                        console.log(updatedVideo);
                      });
                }
                return updatedVideo;
              });
        
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
                    alert("Error uploading video ❌");
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.text();
                console.log('GIF creation response:', data);

                alert("Video uploaded successfully ✅");
            } catch (error) {
                console.error('Error uploading video:', error);
                alert("Error uploading video ❌");
            }
            

        } else {
            console.error("No video file selected");
        }
        setIsUploading(false);
        setVideoFile(null);
    }

    return (
        <form
        className="flex flex-col gap-2 border-l-2 border-r-2 border-white px-10"
        onSubmit={handleUpload}
        >
            <div className="mb-2 block">
                <Label color="light" htmlFor="video" value="Upload Video" />
            </div>
            <FileInput 
                id="dropzone-file" 
                onChange={handleFileChange}
                accept="video/mp4,video/x-m4v,video/*"
                color={videoFile!==null ? "info" : "gray"}
            />
            {videoFile!==null && <div>
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
                type="submit"
                disabled={!videoFile}
            >
            {isUploading && <Spinner aria-label="Spinner button example" size="sm" className="mr-3"/>}
                Upload Video
            </Button>
        </form>
    );
};


export default UploadVideo;