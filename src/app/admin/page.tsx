import { getUser } from "@/lib/auth";
import { getProfileData, getVideoDocuments, getSocialMediaLinks } from "@/utils/firebaseUtils";
import AuthProviderWrapper from "../components/wrapper/authProviderWrapper";
import ProfileImageUpload from "../components/admin-components/profileImageUpload";
import ProfileData from "../components/profileData";
import UploadVideo from "../components/admin-components/uploadVideo";
import DeleteVideo from "../components/admin-components/deleteVideo";
import UpdateSocials from "../components/admin-components/updateSocials";
import LogoUpload from "../components/admin-components/logoUpload";

const AdminPage = async () => {
  const [profileData, videoDocuments, socialLinks, tokens] = await Promise.all([
    getProfileData(),
    getVideoDocuments(),
    getSocialMediaLinks(),
    getUser(),
  ]);

  return (
    <AuthProviderWrapper tokens={tokens}>
      <h1 className="text-7xl text-center my-5">My Dashboard</h1>
      <div className="flex flex-row min-h-screen justify-center items-start gap-10">
        <div>
          <ProfileImageUpload />
          <LogoUpload />
          <ProfileData initialProfileData={profileData as UserData} />
        </div>
        <UploadVideo />
        <UpdateSocials initialSocialLinks={socialLinks as Socials} />
        <DeleteVideo initailVideoDocuments={videoDocuments} />
      </div>
    </AuthProviderWrapper>
  );
}

export default AdminPage;