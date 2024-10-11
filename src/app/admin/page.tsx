'use client'
import React, {useState} from 'react';
import ProfileImageUpload from '../components/profileImageUpload';
import ProfileData from '../components/profileData';
import UploadVideo from '../components/uploadVideo';
import DeleteVideo from '../components/deleteVideo';

const AdminPage: React.FC = ({}) => {
    const [allow, setAllow] = useState(false);

    return (
        <>
        {!allow && 
        <div 
            className='flex flex-col min-h-screen justify-center items-center h-[100vh] w-[100vw]'
            tabIndex={0}
            onKeyDown={(e) => {if (e.key === 'Enter') {setAllow(true)}}}
            >
            <h1>Are you supposed to be here?</h1>
        </div>}
        {
        allow && 
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
        }
        </>
    );
};


export default AdminPage;