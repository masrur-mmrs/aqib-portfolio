import React from 'react';
import About from '../components/about';
import { getProfileData, getProfileImage } from '@/utils/firebaseUtils';

const getStaticProps = async () => {
    const profileData = await getProfileData();
    const profileImage = await getProfileImage();
    return { profileData, profileImage };
}

const AboutPage: React.FC = async () => {
    const { profileData, profileImage } = await getStaticProps()
    return (
        <>
            <About profileData={profileData as UserData} profileImage={profileImage} />
        </>
    );
};


export default AboutPage;