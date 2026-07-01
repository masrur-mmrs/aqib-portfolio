declare module '*.mp4' {
    const src: string;
    export default src;
  }

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare interface ThumbnailData {
  start_time: string;
  duration: string;
}

declare interface Video {
  videoID: string;
  videoTitle: string;
  thumbnail: string;
  videoURL: string;
}

declare interface UserData {
  name: string;
  subtitle: string;
  description: string;
  backgroundColor?: string;
}

declare interface Socials {
  vimeo: string;
  youtube: string;
  twitter: string;
  instagram: string;
  facebook: string;
}