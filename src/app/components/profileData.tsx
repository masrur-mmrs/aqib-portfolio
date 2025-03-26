'use client'
import React, { useState } from 'react';
import { TextInput, Textarea, Button, Spinner } from "flowbite-react";
import { getProfileData, updateProdileData } from '@/utils/firebaseUtils';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

interface ProfileDataProps {
  initialProfileData: UserData;
}

const ProfileData: React.FC<ProfileDataProps> = ({ initialProfileData }) => {
  const queryClient = useQueryClient();
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: getProfileData,
    initialData: initialProfileData,
  }) as { data: UserData, isLoading: boolean };

  const [userData, setUserData] = useState<UserData>(profileData);

  const mutation = useMutation({
    mutationFn: updateProdileData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profileData"]})
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(userData);
  };

  if (isLoading) return <Spinner color="blue" size="lg" />;

  return (
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 pt-5">
          <TextInput
            id="name"
            type="text"
            sizing="md"
            placeholder='Name'
            value={userData?.name}
            onChange={handleChange}
          />
          <TextInput
            id="subtitle"
            type="text"
            sizing="sm"
            placeholder='Subtitle'
            value={userData.subtitle}
            onChange={handleChange}
          />
          <Textarea
            id="description"
            placeholder='Description'
            rows={8}
            value={userData.description}
            onChange={handleChange}
          />
          {mutation.isPending && <p>Updating profile...</p>}
          <Button type="submit" color="blue" disabled={mutation.isPending}>Submit</Button>
        </form>
  );
};

export default ProfileData;