import fs from 'fs';
import { pipeline } from '@xenova/transformers';
import { generateEmbedding } from './embjson.js';



let  embeddingData = fs.readFileSync('embeddings.json');
embeddingData = JSON.parse(embeddingData);
// console.log(embeddingData);

let animal = await generateEmbedding("animal");
// console.log(animal[0]);
 
const similarity = embeddingData.map((embeddingItem)=>{
    const embedding = embeddingItem.embedding;
    return embedding.map((item,index)=>{
        return embedding[index] * animal[index];
    }).reduce((a,b)=>a+b,0);
});
// console.log(similarity);

similarity.map((item,index)=>{
    console.log(similarity[index], embeddingData[index].input);
});