'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AboutSubtitleWrapperProps {
    subtitle: string
}


const AboutSubtitleWrapper: React.FC<AboutSubtitleWrapperProps> = ({subtitle}) => {
    return (
        <motion.h2
            className="text-xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
        >
            {subtitle}
        </motion.h2>
    );
};


export default AboutSubtitleWrapper;