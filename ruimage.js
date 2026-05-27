
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import express from "express";
import multer from "multer";
import path from "path";
dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });
app.get("/",  (req, res) => {
res.send(`<form action = "/upload"   method="post" enctype="multipart/form-data">
            <input type="file" name="image">
            <button type="submit">Upload and Analyze</button>
          </form>` )
});

app.post("/upload", upload.single("image"), async (req, res) => {
    const path = req.file.path;
    res.send(await main(path));
});
const GoogleAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_Key });

async function main(imagePath) {

    const base64Img = readFileSync(imagePath,
         { encoding: "base64" }
        );
  const response = await GoogleAI.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
        {
          inlineData:{
            mimeType: "image/png",
            data: base64Img
          }, 
        },
        {
          text: "tell me color combination of this image"
        }
    ] ,
  }); 
  return response.text;  
   
}

// main();

app.listen(3200);