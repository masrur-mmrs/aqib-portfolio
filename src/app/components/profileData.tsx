'use client'
import React, { useState } from 'react';
import { TextInput, Textarea, Button, Spinner } from "flowbite-react";
import { getProfileData, updateProdileData } from '@/utils/firebaseUtils';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;
const isValidHex = (value: string | undefined): boolean => !value || HEX_RE.test(value);

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

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, backgroundColor: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(userData);
  };

  const hexValid = isValidHex(userData.backgroundColor);

  if (isLoading) return <Spinner color="blue" size="lg" />;

  return (
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 pt-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="backgroundColor"
              className="text-sm font-medium text-gray-700"
            >
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                aria-label="Open color picker"
                value={hexValid && userData.backgroundColor ? userData.backgroundColor : "#ffffff"}
                onChange={handleColorPicker}
                className="h-10 w-10 cursor-pointer rounded border border-gray-300 bg-white p-0.5"
              />
              <div className="flex-1">
                <TextInput
                  id="backgroundColor"
                  type="text"
                  sizing="md"
                  placeholder="#ffffff"
                  value={userData.backgroundColor ?? ""}
                  onChange={handleChange}
                  color={!hexValid ? "failure" : undefined}
                  helperText={!hexValid ? "Must be a 6-digit hex code, e.g. #a3b2c1" : undefined}
                />
              </div>
            </div>
          </div>
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