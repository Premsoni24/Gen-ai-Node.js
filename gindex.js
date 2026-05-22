import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_Key });


app.get("/", async(req, res) => {

  const response = await ai.models.generateContentStream({
    model:"gemini-2.0-flash",
    contents: "tell me about ai in details",
  });

//   console.log(response.text);
for await (const chunk of response){
    const text = chunk.text;
    console.log(text);
};
res.end("_____content generation completed_____");
});


app.listen(3000);