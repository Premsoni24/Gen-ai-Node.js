import openAI from "openai";
import dotenv from 'dotenv'
dotenv.config();
import fs from 'fs';
const client = new openAI({
    apiKey:process.env.GROQ_API_Key,
    baseURL: "https://api.groq.com/openai/v1",
});

async function main(){
    const textResponse = await client.audio.transcriptions.create({
        file: fs.createReadStream("Ghost - Mary On A Cross (Official Music Video).mp3"),
        model: "whisper-large-v3-turbo",
        language: "en",
    });

    console.log(textResponse.text);
    const rawText = textResponse.text;
    fs.writeFileSync("transcription.txt", rawText, "utf-8");
}
main();