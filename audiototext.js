import openAI from "openai";
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const client = new openAI({
    apiKey:process.env.GROQ_API_Key,
    baseURL: "https://api.groq.com/openai/v1",
});

const app = express();
app.get("/", (req, res) => {
    res.send(`<form action="/upload" method="post" enctype="multipart/form-data"> 
        <input type="file" name="audiofile" />
        <button type="submit">Upload</button>
    </form>`);
})
const storage = multer.diskStorage({
      destination: 'uploads/',
    filename:(req, file,cb)=>{
        const ext = path.extname(file.originalname);
        cb(null,Date.now()+ext);
    }
});
const upload = multer({storage});
app.post("/upload", upload.single("audiofile"), async (req, res) => {
    const filepath = req.file.path;
   const textResponse = await client.audio.transcriptions.create({
        file: fs.createReadStream(filepath),
        model: "whisper-large-v3-turbo",
        language: "en",
    });
      fs.writeFileSync("transcription.txt", textResponse.text, "utf-8");
      res.send(textResponse.text);
});

app.listen(3200);


