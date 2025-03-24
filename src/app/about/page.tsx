import React from 'react';
import About from '../components/about';
import { getProfileData, getProfileImage } from '@/utils/firebaseUtils';

export const dynamic = "force-dynamic"

const getServerSideProps = async () => {
    const profileData = await getProfileData();
    const profileImage = await getProfileImage();
    return { profileData, profileImage };
}

const AboutPage: React.FC = async () => {
    const { profileData, profileImage } = await getServerSideProps()
    return (
        <>
            <About profileData={profileData as UserData} profileImage={profileImage} />
        </>
    );
};


export default AboutPage;