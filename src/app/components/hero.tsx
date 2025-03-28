import React from 'react';
import Link from 'next/link';
import HeroWrapper from './wrapper/heroWrapper';
import HeroNameWrapper from './wrapper/heroNameWrapper';
import HeroSubtitleWrapper from './wrapper/heroSubtitleWrapper';
import HeroLinkWrapper from './wrapper/heroLinkWrapper';
import { getProfileData } from '@/utils/firebaseUtils';

const getServerSideProps = async () => {
  const userData = await getProfileData();
  return userData as UserData;
}

const Hero: React.FC = async () => {
  const profile = await getServerSideProps()

  return (
    <HeroWrapper>
      <HeroNameWrapper name={profile?.name.toUpperCase()} />
      <HeroSubtitleWrapper subtitle={profile?.subtitle} />
        <HeroLinkWrapper>
          <Link className="link btn2" href="/work">
            My Work →
          </Link>
        </HeroLinkWrapper>
    </HeroWrapper>
  );
};

export default Hero;
