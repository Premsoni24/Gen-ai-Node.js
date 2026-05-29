import fs from 'fs';
import { pipeline } from '@xenova/transformers';
import { generateEmbedding } from './embjson.js';



let  embeddingData = fs.readFileSync('embeddings.json');
embeddingData = JSON.parse(embeddingData);
// console.log(embeddingData[0]);
// console.log(embeddingData[0]);
// console.log(typeof embeddingData[0]);
let animal = await generateEmbedding("animal");
animal = animal[0];
// console.log(animal[0]);
//  console.log("embedding length:", embeddingData[0].embedding.length);
// console.log("animal length:", animal.length);
// console.log(typeof animal[0]);
// console.log(animal[0]);
const similarity = embeddingData.map((embeddingItem)=>{
    
    const embedding = embeddingItem.embedding;
    // console.log(embedding);
    return embedding.map((item,index)=>{
        return embedding[index] * animal[index];
    }).reduce((a,b)=>a+b,0);
});
// console.log(similarity);

similarity.map((item,index)=>{
    console.log(similarity[index], embeddingData[index].input);
});