import { pipeline } from '@xenova/transformers';
import fs from 'fs';
const arr = ["cat", "dog", "apple"];
async function main() {

    const extractor =
      await pipeline(

        'feature-extraction',

        'Xenova/all-MiniLM-L6-v2'
      );

    const output =
      await extractor(

        arr,

        {
          pooling: 'mean',
          normalize: true
        }
      );
   const manageEmbeddings =

  output.tolist().map((item, index) => {

    const itemKey =
      arr[index];

    return {

      [itemKey]: item
    };
});
    console.log(manageEmbeddings);
    fs.writeFileSync('embeddings.json', JSON.stringify(manageEmbeddings));
}

main();