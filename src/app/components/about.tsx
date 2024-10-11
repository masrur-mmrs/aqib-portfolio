'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProfileData, getProfileImage } from '@/utils/firebaseUtils';

interface UserData {
    name: string;
    subtitle: string;
    description: string;
  }

const About: React.FC = ({}) => {
    const [profileImage, setProfileImage] = useState<string>('');
    const [profileData, setProfileData] = useState<UserData>({name: '', subtitle: '', description: ''});

    useEffect(() => {
        getProfileData().then((data) => {
            setProfileData(data! as UserData);
        });
        getProfileImage().then((data) => {
            setProfileImage(data! as string);
        })
    }, []);

    return (
        <div className="flex flex-col sm:flex-row min-h-screen sm:justify-start items-center gap-10 w-full">
                <Image 
                src={profileImage}
                alt="Profile Image"
                width={700} 
                height={700}
                className="px-5 sm:pl-40 pt-3 sm:pt-0"
                />
             <div className="flex flex-col gap-3 items-center sm:items-start">
                 <h1 className="text-7xl">{(profileData?.name).toUpperCase()}</h1>
                 <h2 className="text-xl font-medium">{profileData.subtitle}</h2>
                 <p className="px-5 text-center sm:text-left sm:pl-0 sm:pr-5 font-extralight">
                    {profileData.description}
                 </p>
             </div>
        </div>
    );
};


export default About;