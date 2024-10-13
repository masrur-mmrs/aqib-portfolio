import React from 'react';
import Image from 'next/image';
import { getProfileData, getProfileImage } from '@/utils/firebaseUtils';
import AboutWrapper from './wrapper/aboutWrapper';
import ProfileImageWrapper from './wrapper/profileImageWrapper';
import AboutNameWrapper from './wrapper/aboutNameWrapper';
import AboutSubtitleWrapper from './wrapper/aboutSubtitleWrapper';
import AboutDescriptionWrapper from './wrapper/aboutDescriptionWrapper';

const getServerSideProps = async () => {
    const profileData = await getProfileData();
    const profileImage = await getProfileImage();
    return { profileData, profileImage };
}

const About: React.FC = async () => {
    const { profileData, profileImage } = await getServerSideProps()

    return (
        <AboutWrapper>
        <ProfileImageWrapper>
            <Image
                src={profileImage}
                alt="Profile Image"
                width={4000}
                height={4000}
            />
        </ProfileImageWrapper>
            <section
                className="flex flex-col gap-3 items-center sm:items-start"
            >    
            <AboutNameWrapper name={profileData?.name.toUpperCase()}/>
            <AboutSubtitleWrapper subtitle={profileData?.subtitle}/>
            <AboutDescriptionWrapper description={profileData?.description}/>
            </section>
        </AboutWrapper>
    );
};

export default About;
