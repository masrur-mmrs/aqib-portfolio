'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getProfileData, getProfileImage } from '@/utils/firebaseUtils';

interface UserData {
    name: string;
    subtitle: string;
    description: string;
}

const About: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string>('');
    const [profileData, setProfileData] = useState<UserData>({ name: '', subtitle: '', description: '' });
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        getProfileData().then((data) => {
            setProfileData(data! as UserData);
                getProfileImage().then((data) => {
                setProfileImage(data! as string);
                setVisible(true);
            });
        });
    }, []);

    return (
        <>
            {visible && (
                <motion.div
                    className="flex flex-col sm:flex-row min-h-screen sm:justify-start items-center gap-10 w-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className="px-5 sm:pl-40 pt-3 sm:pt-0"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Image
                            src={profileImage}
                            alt="Profile Image"
                            width={4000}
                            height={4000}
                        />
                    </motion.div>

                    <motion.div
                        className="flex flex-col gap-3 items-center sm:items-start"
                        // initial={{ opacity: 0, x: 100 }}
                        // animate={{ opacity: 1, x: 0 }}
                        // transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.h1
                            className="text-7xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {(profileData?.name).toUpperCase()}
                        </motion.h1>
                        <motion.h2
                            className="text-xl font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {profileData.subtitle}
                        </motion.h2>
                        <motion.p
                            className="px-5 text-center sm:text-left sm:pl-0 sm:pr-5 font-extralight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            {profileData.description}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default About;
