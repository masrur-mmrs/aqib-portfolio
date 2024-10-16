'use client'
import React, { useState, useEffect } from "react";
import { FileInput, Label, Button } from "flowbite-react";
import { uploadProfileImage } from "@/utils/firebaseUtils";

const ProfileImageUpload = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [imageUploadStatus, setImageUploadStatus] = useState<boolean | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setProfileImage(null);
            setImageUploadStatus(null);
        }, 5000);
    }, [imageUploadStatus]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setProfileImage(event.target.files[0]);
        }
      };

    const handleUpload = () => {
        if (profileImage) {
            try {
            uploadProfileImage(profileImage);
            console.log("Profile image uploaded successfully");
            // You can add additional logic here, like updating UI or notifying the user
            setImageUploadStatus(true);
            } catch (error) {
            console.error("Error uploading profile image:", error);
            // Handle the error, maybe show a message to the user
            setImageUploadStatus(false);
            }
        } else {
            console.log("No image selected");
            // You might want to show a message to the user here
        }
    };

    const getFileInputColor = () => {
        if (imageUploadStatus === true) {
            return "success";
        } else if (imageUploadStatus === false) {
            return "failure";
        } else {
            return "gray";
        }
    }


    return (
    <form
      onSubmit={handleUpload}
      >
      <div className="mb-2 block">
        <Label color="light" htmlFor="file-upload" value="Upload profile image" />
      </div>
      <FileInput 
        id="file-upload" 
        onChange={handleFileChange}
        accept="image/*"
        color={getFileInputColor()}
      />
      <Button 
        className="mt-4" 
        color="blue"
        type="submit"
        disabled={!profileImage}
      >
        Upload Image
      </Button>
    </form>
    );
}

export default ProfileImageUpload