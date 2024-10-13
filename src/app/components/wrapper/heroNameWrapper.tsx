'use client'
import React from 'react';
import { motion } from 'framer-motion';


interface HeroNameWrapperProps {
    name: string
}


const HeroNameWrapper: React.FC<HeroNameWrapperProps> = ({name}) => {
    return (
        <motion.h1
            className="text-7xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            {name}
        </motion.h1>
    );
};


export default HeroNameWrapper;