import React from 'react';
import ProfileImageUpload from '../components/profileImageUpload';
import ProfileData from '../components/profileData';
import UploadVideo from '../components/uploadVideo';
import DeleteVideo from '../components/deleteVideo';
import { getProfileData } from '@/utils/firebaseUtils';

interface UserData {
    name: string;
    subtitle: string;
    description: string;
}

const getServerSideProps = async () => {
    const profileData = await getProfileData();
    return profileData as UserData;
}

const AdminPage: React.FC = async ({}) => {

    const profileData = await getServerSideProps();

    return (
        <>
            <h1 className="w-full text-7xl text-center py-5">Admin Pannel</h1> 
            <div className="flex flex-row min-h-screen justify-center items-start gap-10">
                <div>
                    <ProfileImageUpload/>
                    <ProfileData profileData={profileData}/>
                </div>
                <UploadVideo/>
                <DeleteVideo/>
            </div>
        </>
    );
};


export default AdminPage;