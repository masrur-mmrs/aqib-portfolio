'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const BackButton: React.FC = ({}) => {
    const router = useRouter();
    return (<button className="p-3" onClick={() => router.back()}>◀ Back</button>);
};


export default BackButton;