'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface HeroWrapperProps {
    children: React.ReactNode;
}

const HeroWrapper: React.FC<HeroWrapperProps> = ({children}) => {
    return (
        <motion.div
        className="flex flex-col min-h-screen justify-center items-center !overflow-y-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};


export default HeroWrapper;