import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config();
import fs from 'fs';
import say from 'say';
import gTTS from "gtts";
import express from 'express';
import path from "path";

const app = express();
const client = new OpenAI({
    apiKey:process.env.GROQ_API_Key,
    baseURL: "https://api.groq.com/openai/v1",
});

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send(`<form action="/speak" method="post"> 
        <input type="text" name="text" />
        <button type="submit">Speak</button>
    </form>`);
})
app.post("/speak", async (req, res) => {
    const text = req?.body?.text;
//     res.send(text);

//     say.export(
//   text,
//   "Microsoft Zira Desktop",
//   1,
//   "output.wav",

//   (err) => {

//     if (err) {
//       return console.error(err);
//     }

//     console.log("Audio saved");
//   }
// );

const gtts = new gTTS(text, "en");
gtts.save("output.mp3", (err) => {
  if (err) {
    return console.error(err);
  }else {
    console.log("Audio saved");
  } 
});
});


app.listen(8080);
