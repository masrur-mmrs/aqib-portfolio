'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AboutDescriptionWrapperProps {
    description: string;
}


const AboutDescriptionWrapper: React.FC<AboutDescriptionWrapperProps> = ({description}) => {
    return (
        <motion.p
            className="px-5 text-center sm:text-left sm:pl-0 sm:pr-5 font-extralight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
        >
            {description}
        </motion.p>
    );
};


export default AboutDescriptionWrapper;