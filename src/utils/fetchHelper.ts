import { getProfileData, getVideoDocuments, getSocialMediaLinks, getThumbnail } from "./firebaseUtils";

export const fetchProfileData = async () => {
    const profileData = await getProfileData();
    return profileData;
};

export const fetchVideoData = async () => {
    const videoData = await getVideoDocuments();
    return videoData;
};

export const fetchSocials = async () => {
    const socials = await getSocialMediaLinks();
    return socials;
}

export const fetchThumbnail = async (thumbnailName: string) => {
    const thumbnail = await getThumbnail(thumbnailName);
    return thumbnail;
}