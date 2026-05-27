import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
import express from 'express';

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

dotenv.config();
const GoogleAI = new GoogleGenAI({ apiKey: process.env.geminiKey })

app.get("/", (req, resp) => {
  resp.send(`<form action="/generate" method="post">
    <input type='text' placeholder='enter your prompt' name="imageText" />
    <button>Click Me</button>
    </form>`)
})

app.post("/generate",async (req,resp)=>{
  const prompt= req.body.imageText;
  await main(prompt)
  resp.send("image generated")
})



async function main(prompt) {
  const response = await GoogleAI.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1
    }
  })
  // console.log(response.generatedImages[0].image.imageBytes)
  const imgBase64 = response.generatedImages[0].image.imageBytes;
  const buffer = Buffer.from(imgBase64, 'base64');
  writeFileSync("imgWithUI.png", buffer)

}

// main();

app.listen(3000)