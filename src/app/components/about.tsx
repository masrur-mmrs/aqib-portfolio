import React from 'react';
import Image from 'next/image';

import AboutWrapper from './wrapper/aboutWrapper';
import ProfileImageWrapper from './wrapper/profileImageWrapper';
import AboutNameWrapper from './wrapper/aboutNameWrapper';
import AboutSubtitleWrapper from './wrapper/aboutSubtitleWrapper';
import AboutDescriptionWrapper from './wrapper/aboutDescriptionWrapper';

interface AboutProps {
    profileData: UserData,
    profileImage: string
}

const About: React.FC<AboutProps> = async ({ profileData, profileImage }) => {
    return (
        <AboutWrapper>
        <ProfileImageWrapper>
            <Image
                priority
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
