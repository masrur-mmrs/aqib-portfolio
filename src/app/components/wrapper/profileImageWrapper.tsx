'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface ProfileImageWrapperProps {
    children: React.ReactNode
}


const ProfileImageWrapper: React.FC<ProfileImageWrapperProps> = ({children}) => {
    return (
        <motion.div
            className="px-5 sm:pl-40 pt-3 sm:pt-0"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {children}
        </motion.div>
    );
};


export default ProfileImageWrapper;