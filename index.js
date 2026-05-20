import 'dotenv/config';
import OpenAI from 'openai';



const client = new OpenAI({
  apiKey: process.env.GROQ_API_Key,
 baseURL: "https://api.groq.com/openai/v1",
});

const context =[
  {
   role: 'system',
   content:'keep answer short and simple'
}
]

async function main(question) {
try{
  context.push({
    role: 'user',
    content: question
  });

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: context
  });
  context.push({role: 'assistant',content: response.choices[0].message.content});

  console.log(response.choices[0].message.content);
}
catch(error){
  console.error("Error generating content:", error);
} 
} 

// main();
process.stdout.write("Ask your question: ");
process.stdin.on('data',async (data) =>{
  const question = data.toString().trim();
  console.log(`You asked: ${question}`);
  if(question.toLowerCase() === 'exit'){
    console.log("Exiting...");
    process.exit();
  }else{
  main(question);
  }
}

)


