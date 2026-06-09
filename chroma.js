import {CloudClient} from 'chromadb'
import { generateEmbedding } from './embjson.js';
import dotenv from 'dotenv'
dotenv.config();


const client = new CloudClient({
    apiKey:process.env.CHROMA_API_KEY,
    tenant:process.env.CHROMA_TENANT,
    database:process.env.CHROMA_DATABASE
});

// async function main(){
   
//     const collection = await client.getOrCreateCollection(
//         {
//              name: 'animal' 
//         }
//     );
//      collection.add({
//         ids:['1'],
//         documents:['a dog'],
//         embeddings:[[1,-1,-1]]
//     })
// }

async function main(){
   const premData = await generateEmbedding([
    "Prem is doing gen ai also as software engineer",
    "Prem is 20 years old",
    "Prem live in gurgaon",
    "Prem own a tata car",
    "Prem is your friend"
]);

    const collection = await client.getCollection(
        {
             name: 'usersData' 
        }
    );
    await collection.add({
        ids:['1','2','3','4','5'],
        documents:[
    "Prem is doing gen ai also as software engineer",
    "Prem is 20 years old",
    "Prem live in gurgaon",
    "Prem own a tata car",
    "Prem is your friend"
],
       embeddings: premData
    })
    console.log('Data added to ChromaDB collection successfully!');
}

// main();
async function findSimilarity(){
    const colors =  await client.getCollection({
        name : 'usersData'
    });
    const query = await generateEmbedding('prem car');
    const results = await colors.query({
        queryEmbeddings:query,
        nResults: 1
    })
    console.log(results);
}
findSimilarity();