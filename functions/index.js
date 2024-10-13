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

initializeApp();
const storage = getStorage();

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

// CORS handler
const corsHandler = cors({origin: true});

exports.generateGifThumbnail = functions.runWith({timeoutSeconds: 300, memory: "1GB"}).https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    if (!req.rawBody) {
      return res.status(400).send("No rawBody found");
    }


    const busboy = Busboy({headers: req.headers});
    const tempFilePath = join(tmpdir(), `${Date.now()}.mp4`);
    let videoTitle = "";
    let startTime = 0;
    let duration = 3;


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
          duration = parseInt(val, 10);
        } else if (fieldname === "startTime") {
          startTime = parseInt(val, 10);
        }
      });

      busboy.once("close", resolve).once("error", reject);

      busboy.end(req.rawBody);
    });

    if (!videoTitle) {
      return res.status(400).send("Missing video title");
    }

    const tempGifPath = join(tmpdir(), `${videoTitle}Thumbnail.gif`);

    ffmpeg(tempFilePath)
        .setStartTime(startTime)
        .duration(duration)
        .output(tempGifPath)
        .on("end", async () => {
          console.log("GIF generated successfully.");

          const gifFileName = `${videoTitle}Thumbnail.gif`;
          const gifFile = storage.bucket().file(`thumbnails/${gifFileName}`);
          await storage.bucket().upload(tempGifPath, {
            destination: gifFile,
            metadata: {contentType: "image/gif"},
          });


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
