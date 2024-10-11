// // /pages/api/upload.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Vimeo } from '@vimeo/vimeo';
// import dotenv from 'dotenv';
// import formidable from 'formidable';
// import { NextResponse } from 'next/server';

// dotenv.config();

// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing for this API route
//   },
// };
// const getFormidable = async () => {
//   const formidable = (await import('formidable')).default;
//   return new formidable.IncomingForm();
// };

// // Function to upload a video
// async function uploadVideo(filePath: string, title: string, description: string) {
//   const Vimeo = (await import('@vimeo/vimeo')).default;
//   const client = Vimeo(process.env.VIMEO_CLIENT_ID, process.env.VIMEO_CLIENT_SECRET, process.env.VIMEO_CLIENT_TOKEN);

//   return new Promise((resolve, reject) => {
//     client.upload(
//       filePath,
//       {
//         name: title,
//         description: description,
//       },
//       (uri: any) => {
//         resolve({ uri });
//       },
//       (bytes_uploaded: number, bytes_total: number) => {
//         const percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
//         console.log(`${percentage}% uploaded`);
//       },
//       (error: any) => {
//         console.error('Upload failed:', error);
//         reject(error);
//       }
//     );
//   });
// }




// export async function POST(req: NextRequest) {
//   const form = await getFormidable();

//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         reject(new Response('Error parsing the files', { status: 500 }));
//         return;
//       }

//       const { title, description } = fields;
//       const file = files.file[0];
//       const filePath = file.filepath; // Path to the uploaded file

//       try {
//         const result = await uploadVideo(filePath, title as string, description as string);
//         resolve(NextResponse.json(result));
//       } catch (error) {
//         console.error(error);
//         reject(new Response('Error uploading the video', { status: 500 }));
//       }
//     });
//   });
// }