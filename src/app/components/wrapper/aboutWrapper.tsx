'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface AboutWrapperProps {
    children: React.ReactNode
}


const AboutWrapper: React.FC<AboutWrapperProps> = ({children}) => {
    return (
        <motion.div
            className="flex flex-col sm:flex-row min-h-screen sm:justify-start items-center gap-10 w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};


export default AboutWrapper;