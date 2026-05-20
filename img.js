import 'dotenv/config';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.GROQ_API_Key,
    baseURL: "https://api.groq.com/openai/v1",
})


async function main() {
try{
 

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    // prompt: "generate image for a cat in bus",
    // size: "512x512",
    // response_format:"b64_json",
    // n: 1
    messages: [
       {
        role: "user",
        content: "cats on hoarseback",
       }
    ],
  });
  console.log(response.choices[0].message.content);
     const imagePrompt =
      response.choices[0].message.content;

    console.log("Generated Prompt:");
    console.log(imagePrompt);

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}`;

    console.log("\nImage URL:");
    console.log(imageUrl);


}
catch(error){
  console.error("Error generating content:", error);
} 
} 

main();



// import OpenAI from "openai";
// import dotenv from 'dotenv'
// import {writeFileSync} from 'fs'
// dotenv.config();

// const client = new OpenAI({apiKey:process.env.openAI_Key})

// async function main(){
//   const response = await client.images.generate({
//     model:"dall-e-2",
//     prompt:"generate image of a with blonde hair",
//     size:"512x512",
//     response_format:"b64_json",
//     n:1
//   })

//   console.log(response);
//   const rawImage = response.data[0].b64_json;
//   const path ="./generatedImg.png"
//   const butter = Buffer.from(rawImage,'base64')

//   writeFileSync(path,butter);
//   console.log("image is saved and path is "+ path);
  
// }
// main()