
// import { GoogleGenAI } from '@google/genai'
// import dotenv from 'dotenv'
// import { writeFileSync } from 'fs'
// import express from 'express';

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// dotenv.config();
// const GoogleAI = new GoogleGenAI({ apiKey: process.env.geminiKey })

// app.get("/", (req, resp) => {
//   resp.send(`<form action="/generate" method="post">
//     <input type='text' placeholder='enter your prompt' name="imageText" />
//     <button>Click Me</button>
//     </form>`)
// })

// app.post("/generate", async (req, resp) => {
//   const prompt = req.body.imageText;
//   await main(prompt)
//   resp.send("image generated")
// })



// async function main(prompt) {
//   let operation = await GoogleAI.models.generateVideos({
//     model: 'veo-3.0-generate-001',
//     prompt: "running a girl on grass",
//     config: {
//       numberOfImages: 1
//     }
//   })

//   while (!operation.done) {
//   console.log("please wait, video is getting ready")
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   operation = await GoogleAI.operations.getVideosOperation({
//     operation: operation
//   })
// }

// GoogleAI.files.download({
//   file: operation.response.generateVideos[0].video,
//   downloadPath: "video.mp4",
// })

// }


// main();

// // app.listen(3000)



import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import gTTS from "gtts";
import { exec } from "child_process";

dotenv.config();

// =========================
// GROQ CLIENT
// =========================

const client = new OpenAI({

    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1",
});

// =========================
// MAIN FUNCTION
// =========================

async function main() {

    // =========================
    // STEP 1 → GENERATE STORY
    // =========================

    const response =
        await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",

                    content:
                        "Create a 3 scene cinematic story about futuristic AI robots"
                }
            ],

            temperature: 1,
        });

    const story =
        response.choices[0].message.content;

    console.log("\nSTORY:\n");
    console.log(story);

    // =========================
    // STEP 2 → CREATE SCENES
    // =========================

    const scenes = [

        "Futuristic AI city with flying cars",

        "Humanoid robot walking in neon streets",

        "Advanced AI robots helping humans"
    ];

    // =========================
    // STEP 3 → GENERATE IMAGES
    // =========================

    for (let i = 0; i < scenes.length; i++) {

        const prompt = scenes[i];

        const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

        const path =
          `image${i + 1}.png`;

        await downloadImage(imageUrl, path);

        console.log(
          `Image ${i + 1} saved`
        );
    }

    // =========================
    // STEP 4 → GENERATE AUDIO
    // =========================

    const gtts =
        new gTTS(story, "en");

    await new Promise((resolve, reject) => {

        gtts.save(
            "audio.mp3",

            function(err) {

                if (err) {

                    reject(err);

                } else {

                    console.log(
                      "\nAudio saved"
                    );

                    resolve();
                }
            }
        );
    });

    // =========================
    // STEP 5 → CREATE VIDEO
    // =========================

    const ffmpegCommand =

`ffmpeg -y -loop 1 -t 5 -i image1.png -loop 1 -t 5 -i image2.png -loop 1 -t 5 -i image3.png -i audio.mp3 -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0,format=yuv420p[v]" -map "[v]" -map 3:a -shortest output.mp4`;

    exec(ffmpegCommand, (error) => {

        if (error) {

            console.log(error);

        } else {

            console.log(
              "\nVIDEO CREATED: output.mp4"
            );
        }
    });
}

// =========================
// DOWNLOAD IMAGE FUNCTION
// =========================

function downloadImage(url, filepath) {

    return new Promise((resolve, reject) => {

        https.get(url, (res) => {

            const file =
                fs.createWriteStream(filepath);

            res.pipe(file);

            file.on("finish", () => {

                file.close();

                resolve();
            });

        }).on("error", reject);
    });
}

// =========================
// START
// =========================

main();