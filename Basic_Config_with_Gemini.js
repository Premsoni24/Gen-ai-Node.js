import {GoogleGenAI} from '@google/genai'
import dotenv from 'dotenv'
dotenv.config();

const googleAI = new GoogleGenAI({apiKey:process.env.geminiKey})

async function main(){
    const response = await googleAI.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"what can i wear in a party ",
        config:{
            temperature:2.0,
            // thinkingConfig:{
            //     includeThoughts:true,
            //     thinkingBudget:100
            // }
            systemInstruction:"give simple answers 100 words "
        }
    })
    console.log(response.text)
}

main()