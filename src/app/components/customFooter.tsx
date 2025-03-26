import React from 'react';
import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
  } from "flowbite-react";
  import { BsVimeo, BsFacebook, BsYoutube, BsInstagram, BsTwitter } from "react-icons/bs";
import { getSocialMediaLinks, getProfileData, getLogo } from '@/utils/firebaseUtils';

const getIcon = (key: string) => {
    switch (key) {
        case 'vimeo':
            return BsVimeo;
        case 'youtube':
            return BsYoutube;
        case 'twitter':
            return BsTwitter;
        case 'instagram':
            return BsInstagram;
        case 'facebook':
            return BsFacebook;
        default:
            return BsVimeo;
    }
}

const CustomFooter: React.FC = async ({}) => {
    const socials = await getSocialMediaLinks() as Socials;
    const profileData = await getProfileData();
    const logo = await getLogo();

    return (
    <Footer container className="bg-[--background] mt-5">
      <div className="w-full text-[--foreground]">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand
              href="/"
              src={logo}
              alt="Logo"
              name={profileData?.name.toUpperCase()}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="Go to" />
              <FooterLinkGroup col>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/work">Work</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow Me" />
              <FooterLinkGroup col>
            {Object.entries(socials).map(([key, value]) => 
              value !== '' && (key === 'instagram' || key === 'facebook' || key === 'twitter') && (
                <li key={key}>
                  <FooterLink href="#">{key}</FooterLink>
                </li>
              )
            )}
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by={profileData?.name} year={new Date().getFullYear()} />
          <ul className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          {Object.entries(socials).map(([key, value]) => (
                <li key={key}>
                    {value!=='' && 
                    <FooterIcon href={value} icon={getIcon(key)} />}
                </li>
            ))}
          </ul>
        </div>
      </div>
    </Footer>
    );
};


export default CustomFooter;