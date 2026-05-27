import fs from 'fs';
import { pipeline } from '@xenova/transformers';
 export async function generateEmbedding(dataInArray){
       const extractor = await pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2'
          );
    
        const output = await extractor(
                dataInArray,
             {
              pooling: 'mean',
              normalize: true
            }
          );
       return output.tolist();
      
}
async function createFileForEmbedding(data,file){
    const fileData = JSON.stringify(data);
    const bufferData = Buffer.from(fileData);
    await fs.writeFileSync(file,bufferData);
}
async function readFile(){
    const data = fs.readFileSync('./data.json', 'utf-8');
    const dataInArray = JSON.parse(data.toString());
    let responseData =  await generateEmbedding(dataInArray);
    responseData = responseData.map((item,index)=>{
        return {
            input:dataInArray[index],
            embedding:item
        }
    })
    await createFileForEmbedding(responseData,"embeddings.json");
}
//  readFile();