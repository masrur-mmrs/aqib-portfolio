const functions = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getStorage} = require("firebase-admin/storage");
const {tmpdir} = require("os");
const {join} = require("path");
const {unlinkSync, createWriteStream} = require("fs");
const Busboy = require("busboy");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");

// Initialize Firebase Admin
initializeApp();
const storage = getStorage();

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

// CORS handler
const corsHandler = cors({origin: true});

exports.generateGifThumbnail = functions.https.onRequest(async (req, res) => {
  // Handle CORS
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    // Check if rawBody is available (buffered request content in Cloud Functions)
    if (!req.rawBody) {
      return res.status(400).send("No rawBody found");
    }

    // Create a Busboy instance (Busboy is now a function, not a constructor)
    const busboy = Busboy({headers: req.headers});
    const tempFilePath = join(tmpdir(), `${Date.now()}.mp4`);
    let videoTitle = "";
    let startTime = 0;
    let duration = 3;

    // Handle file and fields using Busboy
    await new Promise((resolve, reject) => {
      busboy.on("file", (fieldname, file, filename) => {
        console.log(`Uploading video: ${filename}`);
        const writeStream = createWriteStream(tempFilePath);
        file.pipe(writeStream);
        file.on("end", () => {
          console.log(`Video file [${filename}] has been uploaded successfully.`);
        });
      });

      busboy.on("field", (fieldname, val) => {
        if (fieldname === "videoTitle") {
          videoTitle = val.replaceAll(" ", "_");
        } else if (fieldname === "duration") {
          duration = parseInt(val, 10); // Convert duration to an integer
        } else if (fieldname === "startTime") {
          startTime = parseInt(val, 10); // Convert start time to an integer
        }
      });

      busboy.once("close", resolve).once("error", reject);

      // End the busboy stream by passing rawBody from Cloud Functions
      busboy.end(req.rawBody);
    });

    // Check for required fields
    if (!videoTitle) {
      return res.status(400).send("Missing video title");
    }

    const tempGifPath = join(tmpdir(), `${videoTitle}Thumbnail.gif`);

    // Convert video to GIF
    ffmpeg(tempFilePath)
        .setStartTime(startTime) // Start GIF from the beginning of the video
        .duration(duration) // Duration of the GIF (3 seconds)
        .output(tempGifPath)
        .on("end", async () => {
          console.log("GIF generated successfully.");

          // Upload the GIF to Firebase Storage
          const gifFileName = `${videoTitle}Thumbnail.gif`;
          const gifFile = storage.bucket().file(`thumbnails/${gifFileName}`);
          await storage.bucket().upload(tempGifPath, {
            destination: gifFile,
            metadata: {contentType: "image/gif"},
          });

          // Clean up temporary files
          unlinkSync(tempFilePath);
          unlinkSync(tempGifPath);

          console.log(`GIF uploaded as thumbnails/${gifFileName}`);
          res.status(200).send(`${gifFileName}`);
        })
        .on("error", (err) => {
          console.error("Error generating GIF:", err);
          res.status(500).send("Error generating GIF");
        })
        .run();
  });
});
