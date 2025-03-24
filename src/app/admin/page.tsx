import React from 'react';
import { getProfileData, getVideoDocuments, getSocialMediaLinks } from '@/utils/firebaseUtils';
import AuthProviderWrapper from '../components/wrapper/authProviderWrapper';
import ProfileImageUpload from '../components/admin-components/profileImageUpload';
import ProfileData from '../components/profileData';
import UploadVideo from '../components/admin-components/uploadVideo';
import DeleteVideo from '../components/admin-components/deleteVideo';
import UpdateSocials from '../components/admin-components/updateSocials';
import LogoUpload from '../components/admin-components/logoUpload';

export const dynamic = "force-dynamic"

async function getData() {
  const profileData = await getProfileData();
  const videoDocuments = await getVideoDocuments();
  const socialLinks = await getSocialMediaLinks();
  return { profileData, videoDocuments, socialLinks };
}

export default async function AdminPage() {
  const { profileData, videoDocuments, socialLinks } = await getData();

  return (
    <>
        <AuthProviderWrapper>
            <h1 className="text-7xl text-center my-5">My Dashboard</h1>
            <div className="flex flex-row min-h-screen justify-center items-start gap-10">
            <div>
                <ProfileImageUpload />
                <LogoUpload/>
                <ProfileData profileData={profileData as UserData} />
            </div>
            <UploadVideo />
            <UpdateSocials socialLinks={socialLinks as Socials} />
            <DeleteVideo videoDocuments={videoDocuments} />
            </div>
        </AuthProviderWrapper>
    </>
  );
}