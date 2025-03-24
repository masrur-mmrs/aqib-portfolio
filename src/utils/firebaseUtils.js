import { app } from '../index'
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage'
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'

//Upload profile image
export const uploadProfileImage = async (profileImage) => {
    const storage = getStorage(app);
    const profileImageRef = ref(storage, `ProfileImage/profileIMG`)
    const snapshot = await uploadBytes(profileImageRef, profileImage)
    console.log("Uploaded profile image", snapshot)
}

//Get profile image
export const getProfileImage = async () => {
    const storage = getStorage(app);
    const profileImageRef = ref(storage, `ProfileImage/profileIMG`)
    const snapshot = await getDownloadURL(profileImageRef)
    return snapshot;
}

//Update profile data
export const updateProdileData = async (data) => {
    const db = getFirestore(app);
    const userRef = doc(db, "user", "aqibData");
    await setDoc(userRef, data, { merge: true })
}

//Get profile data
export const getProfileData = async () => {
    const db = getFirestore(app);
    const userRef = doc(db, "user", "aqibData");
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data() ;
    } else {
        console.log("No such document!");
    }
}

//Create video document
export const createVideoDocument = async (video) => {
    const db = getFirestore(app);
    const videoRef = doc(db, "videos", video.videoID);
    await setDoc(videoRef, video, { merge: true })
}

//Get video documents
export const getVideoDocuments = async () => {
    const db = getFirestore(app);
    let returnData = [];
    const querySnapshot = await getDocs(collection(db, "videos"));
    querySnapshot.forEach((doc) => {
        returnData.push(doc.data());
    });
    return returnData;
}

//Get thumbnail
export const getThumbnail = async (thumbnail) => {
    const storage = getStorage(app);
    const thumbnailRef = ref(storage, `thumbnails/${thumbnail}`);
    const snapshot = await getDownloadURL(thumbnailRef);
    return snapshot;
}

//Get video title
export const getVideoTitle = async (videoID) => {
    const db = getFirestore(app);
    const videoRef = doc(db, "videos", videoID);
    const docSnap = await getDoc(videoRef);
    if (docSnap.exists()) {
        return docSnap.data().videoTitle;
    } else {
        console.log("No such document!");
    }
}

//Delete video document
export const deleteVideoDocument = async (videoID) => {
    const db = getFirestore(app);
    const videoRef = doc(db, "videos", videoID);
    await deleteDoc(videoRef);
}

//Delete thumbnail 
export const deleteThumbnail = async (thumbnail) => {
    const storage = getStorage(app);
    const thumbnailRef = ref(storage, `thumbnails/${thumbnail}`)
    await deleteObject(thumbnailRef)
}

//Update social media links data
export const updateSocialMediaLinks = async (data) => {
    const db = getFirestore(app);
    const userRef = doc(db, "user", "socials");
    await setDoc(userRef, data, { merge: true })
}

//Get social media links
export const getSocialMediaLinks = async () => {
    const db = getFirestore(app);
    const userRef = doc(db, "user", "socials");
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

//Upload logo
export const uploadLogo = async (logo) => {
    const storage = getStorage(app);
    const logoRef = ref(storage, `logo/logoIMG`)
    const snapshot = await uploadBytes(logoRef, logo)
    console.log("Uploaded logo", snapshot)
}

//Get logo
export const getLogo = async () => {
    const storage = getStorage(app);
    const logoRef = ref(storage, `logo/logoIMG`)
    const snapshot = await getDownloadURL(logoRef)
    return snapshot;
}