import React from 'react';
import ProfileImageUpload from '../components/profileImageUpload';
import ProfileData from '../components/profileData';
import UploadVideo from '../components/uploadVideo';
import DeleteVideo from '../components/deleteVideo';

const AdminPage: React.FC = ({}) => {

    return (
        <>
            <h1 className="w-full text-7xl text-center py-5">Admin Pannel</h1> 
            <div className="flex flex-row min-h-screen justify-center items-start gap-10">
                <div>
                    <ProfileImageUpload/>
                    <ProfileData/>
                </div>
                <UploadVideo/>
                <DeleteVideo/>
            </div>
        </>
    );
};


export default AdminPage;