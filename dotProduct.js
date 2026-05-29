import fs from 'fs';
import { pipeline } from '@xenova/transformers';
import { generateEmbedding } from './embjson.js';



let  embeddingData = fs.readFileSync('premembeddings.json');
embeddingData = JSON.parse(embeddingData);

let suggestion = await generateEmbedding("what job prem doing?");
suggestion = suggestion[0];

let similarity = embeddingData.map((embeddingItem)=>{
    
    const embedding = embeddingItem.embedding;
    // console.log(embedding);
    return embedding.map((item,index)=>{
        return embedding[index] * suggestion[index];
    }).reduce((a,b)=>a+b,0);
});
// console.log(similarity);

similarity = similarity.map((item,index)=>{
    return {value:similarity[index],input:embeddingData[index].input};
});
// console.log(similarity);
similarity.sort((a,b)=>{
    return b.value - a.value;
});
console.log(similarity[0]);