'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface HeroLinkWrapperProps {
    children: React.ReactNode;
}


const HeroLinkWrapper: React.FC<HeroLinkWrapperProps> = ({children}) => {
    return (
        <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
                {children}
        </motion.div>
    );
};


export default HeroLinkWrapper;