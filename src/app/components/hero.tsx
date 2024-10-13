'use client';

import { getProfileData } from '@/utils/firebaseUtils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface UserData {
  name: string;
  subtitle: string;
  description: string;
}

const Hero: React.FC = () => {
  const [profile, setProfile] = useState<UserData>({
    name: '',
    subtitle: '',
    description: '',
  });
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    getProfileData().then((data) => {
      setProfile(data as UserData);
      setVisible(true);
    });
  }, []);

  return (
    <>
      {visible && (
        <motion.div
          className="flex flex-col min-h-screen justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-7xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {profile.name.toUpperCase()}
          </motion.h1>
          <motion.h2
            className="text-xl font-extralight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {profile.subtitle}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link className="link btn2" href="/work">
              My Work →
            </Link>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Hero;
