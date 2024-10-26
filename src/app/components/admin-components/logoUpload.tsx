'use client'
import React, { useState, useEffect } from "react";
import { FileInput, Label, Button } from "flowbite-react";
import { uploadLogo } from "@/utils/firebaseUtils";

const LogoUpload = () => {
    const [logo, setLogo] = useState<File | null>(null);
    const [imageUploadStatus, setImageUploadStatus] = useState<boolean | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setLogo(null);
            setImageUploadStatus(null);
        }, 5000);
    }, [imageUploadStatus]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(event.target.files[0]);
        }
      };

    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (logo) {
            try {
            uploadLogo(logo);
            console.log("Logo uploaded successfully");
            setImageUploadStatus(true);
            } catch (error) {
            console.error("Error uploading profile image:", error);
            setImageUploadStatus(false);
            }
        } else {
            console.log("No image selected");
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
        <Label color="light" htmlFor="file-upload" value="Upload footer logo" />
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
        disabled={!logo}
      >
        Upload Logo
      </Button>
    </form>
    );
}

export default LogoUpload