import React, {useState, useEffect} from 'react';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import { getThumbnail } from '@/utils/firebaseUtils';

interface videoitemProps {
    title: string;
    thumbnail: string | StaticImageData;
    videoID: string;
}


const VideoItem: React.FC<videoitemProps> = ({ title, thumbnail, videoID }) => {
    const [thumbnailData, setThumbnailData] = useState<string>('');

    const getThumbnailData = async () => {
        const thumbnailData = await getThumbnail(thumbnail);
        setThumbnailData(thumbnailData);
        
    }

    useEffect(() => {
        getThumbnailData();
    }, []);

    return (
        <Link 
            href={`/video/${videoID}`}
            className="block">
            {thumbnailData !== '' && <Image
              src={thumbnailData}
              alt={title}
              width={300}
              height={300}
              unoptimized
              className="w-full h-auto"
            />}
            <h2 
              className="absolute inset-0 flex justify-center items-center text-transparent hover:text-white text-xl font-bold hover:bg-black hover:bg-opacity-50"
            >
              {title}
            </h2>
        </Link>
    );
};


export default VideoItem;