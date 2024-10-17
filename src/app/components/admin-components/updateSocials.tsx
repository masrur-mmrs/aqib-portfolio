'use client'
import React, { useState } from 'react';
import { updateSocialMediaLinks } from '@/utils/firebaseUtils';
import { TextInput, Button, Label } from 'flowbite-react';

interface UpdateSocialsProps {
    socialLinks: Socials
}


const UpdateSocials: React.FC<UpdateSocialsProps> = ({socialLinks}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [socials, setSocials] = useState<Socials>(socialLinks);

    const handleSocialsUpdate = (field: string, value: string) => {
        setSocials({ ...socials, [field]: value });
    }
    const handleSocialsUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateSocialMediaLinks(socials);
    }

    return (
        <form onSubmit={handleSocialsUpload}>
            <Label color='light'>Update Social Media Links</Label>
            <br></br>
            <Label color='light' htmlFor='vimeo' value='Vimeo'/>
            <TextInput
                id='vimeo'
                type='text'
                name='vimeo'
                placeholder='Vimeo'
                value={socials.vimeo}
                onChange={(e) => handleSocialsUpdate('vimeo', e.target.value)}
            />
            <Label color='light' htmlFor='youtube' value='Youtube'/>
            <TextInput
                id='youtube'
                type='text'
                name='youtube'
                placeholder='Youtube'
                value={socials.youtube}
                onChange={(e) => handleSocialsUpdate('youtube', e.target.value)}
            />
            <Label color='light' htmlFor='twitter' value='Twitter'/>
            <TextInput
                id='twitter'
                type='text'
                name='twitter'
                placeholder='Twitter'
                value={socials.twitter}
                onChange={(e) => handleSocialsUpdate('twitter', e.target.value)}
            />
            <Label color='light' htmlFor='instagram' value='Instagram'/>
            <TextInput
                id='instagram'
                type='text'
                name='instagram'
                placeholder='Instagram'
                value={socials.instagram}
                onChange={(e) => handleSocialsUpdate('instagram', e.target.value)}
            />
            <Label color='light' htmlFor='facebook' value='Facebook'/>
            <TextInput
                id='facebook'
                type='text'
                name='facebook'
                placeholder='Facebook'
                value={socials.facebook}
                onChange={(e) => handleSocialsUpdate('facebook', e.target.value)}
            />
            <Button 
            type='submit'
            color='blue'
            className='w-full mt-4'
            >Update Socials
            </Button>
        </form>
    );
};


export default UpdateSocials;