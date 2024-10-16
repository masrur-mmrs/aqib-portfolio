import React from 'react';
import { getProfileData, getVideoDocuments } from '@/utils/firebaseUtils';
import AuthProviderWrapper from '../components/wrapper/authProviderWrapper';
import ProfileImageUpload from '../components/profileImageUpload';
import ProfileData from '../components/profileData';
import UploadVideo from '../components/uploadVideo';
import DeleteVideo from '../components/deleteVideo';

interface UserData {
  name: string;
  subtitle: string;
  description: string;
}

async function getData() {
  const profileData = await getProfileData();
  const videoDocuments = await getVideoDocuments();
  return { profileData, videoDocuments };
}

export default async function AdminPage() {
  const { profileData, videoDocuments } = await getData();

  return (
    <>
        <AuthProviderWrapper>
            <h1 className="text-7xl text-center my-5">My Dashboard</h1>
            <div className="flex flex-row min-h-screen justify-center items-start gap-10">
            <div>
                <ProfileImageUpload />
                <ProfileData profileData={profileData as UserData} />
            </div>
            <UploadVideo />
            <DeleteVideo videoDocuments={videoDocuments} />
            </div>
        </AuthProviderWrapper>
    </>
  );
}