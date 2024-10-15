'use client';
import React, { useState } from 'react';
import { TextInput, Textarea, Button } from "flowbite-react";
import { updateProdileData } from '@/utils/firebaseUtils';

interface UserData {
  name: string;
  subtitle: string;
  description: string;
}

interface ProfileDataProps {
  profileData: UserData;
}

const ProfileData: React.FC<ProfileDataProps> = ({profileData}) => {
  const [userData, setUserData] = useState<UserData>(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted user data:', userData);
    updateProdileData(userData);
    // Here you can add logic to send the data to your backend or perform other actions
  };

  return (
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 pt-5">
      <div>
        <TextInput
          id="name"
          type="text"
          sizing="md"
          placeholder='Name'
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextInput
          id="subtitle"
          type="text"
          sizing="sm"
          placeholder='Subtitle'
          value={userData.subtitle}
          onChange={handleChange}
        />
      </div>
      <div>
        <Textarea
          id="description"
          placeholder='Description'
          rows={8}
          value={userData.description}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" color='blue'>Submit</Button>
    </form>
  );
};

export default ProfileData;