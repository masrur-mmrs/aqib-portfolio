'use client'
import React, { useState } from 'react';
import { getSocialMediaLinks, updateSocialMediaLinks } from '@/utils/firebaseUtils';
import { TextInput, Button, Label, Spinner } from 'flowbite-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateSocialsProps {
    initialSocialLinks: Socials
}

const UpdateSocials: React.FC<UpdateSocialsProps> = ({ initialSocialLinks }) => {
    const queryClient = useQueryClient();
    const {data: socialLinks, isLoading} = useQuery({
        queryKey: ["socialLinks"],
        queryFn: getSocialMediaLinks,
        initialData: initialSocialLinks
    }) as { data: Socials, isLoading: boolean}

    const [socials, setSocials] = useState<Socials>(socialLinks);

    const mutation = useMutation({
        mutationFn: updateSocialMediaLinks,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["socialLinks"]})
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setSocials(prevData => ({
        ...prevData,
        [id]: value
        }));
    }

    const handleSocialsUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(socials);
    }

    if (isLoading) return <Spinner size="lg" color="blue"/>

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
                onChange={handleChange}
            />
            <Label color='light' htmlFor='youtube' value='Youtube'/>
            <TextInput
                id='youtube'
                type='text'
                name='youtube'
                placeholder='Youtube'
                value={socials.youtube}
                onChange={handleChange}
            />
            <Label color='light' htmlFor='twitter' value='Twitter'/>
            <TextInput
                id='twitter'
                type='text'
                name='twitter'
                placeholder='Twitter'
                value={socials.twitter}
                onChange={handleChange}
            />
            <Label color='light' htmlFor='instagram' value='Instagram'/>
            <TextInput
                id='instagram'
                type='text'
                name='instagram'
                placeholder='Instagram'
                value={socials.instagram}
                onChange={handleChange}
            />
            <Label color='light' htmlFor='facebook' value='Facebook'/>
            <TextInput
                id='facebook'
                type='text'
                name='facebook'
                placeholder='Facebook'
                value={socials.facebook}
                onChange={handleChange}
            />
            {mutation.isPending && <p>Updating social media links</p>}
            <Button 
            type='submit'
            color='blue'
            className='w-full mt-4'
            disabled={mutation.isPending}
            >Update Socials
            </Button>
        </form>
    );
};


export default UpdateSocials;