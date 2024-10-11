import { getProfileData } from '@/utils/firebaseUtils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface UserData {
    name: string;
    subtitle: string;
    description: string;
  }

const Hero: React.FC = ({}) => {
    const [profile, setProfile] = useState<UserData>({name: '', subtitle: '', description: ''});

    useEffect(() => {
        getProfileData().then((data) => {
          setProfile(data! as UserData);
        });
      }, []);
      
    return (
        <div>
            <h1 className="text-7xl">{profile.name.toUpperCase()}</h1>
            <h2 className="text-xl font-extralight">{profile.subtitle}</h2>
            <Link 
            className="link btn2"
            href="/work"
            >My Work →
            </Link>
        </div>
    );
};


export default Hero;