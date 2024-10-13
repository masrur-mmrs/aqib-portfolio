'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSubtitleWrapperProps {
    subtitle: string
}


const HeroSubtitleWrapper: React.FC<HeroSubtitleWrapperProps> = ({subtitle}) => {
    return (
        <motion.h2
              className="text-xl font-extralight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
                {subtitle}
        </motion.h2>
    );
};


export default HeroSubtitleWrapper;