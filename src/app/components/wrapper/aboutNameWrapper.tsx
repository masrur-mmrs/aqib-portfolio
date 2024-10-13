'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AboutNameWrapperProps {
    name: string
}


const AboutNameWrapper: React.FC<AboutNameWrapperProps> = ({name}) => {
    return (
        <motion.h1
            className="text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
                {name}
        </motion.h1>
    );
};


export default AboutNameWrapper;