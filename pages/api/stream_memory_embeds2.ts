// import type { NextApiRequest, NextApiResponse } from 'next'
// import Cors from 'cors'
// // import { ChatOpenAI } from "langchain/chat_models";
// // import { CallbackManager } from "langchain/callbacks";

// import { OpenAI } from "langchain/llms/openai";
// // import { ConversationSummaryMemory } from "langchain/memory";
// import { LLMChain } from "langchain/chains";
// import { PromptTemplate } from "langchain/prompts";

// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { VectorStoreRetrieverMemory } from "langchain/memory";

// const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());


// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// const model= new OpenAI({  openAIApiKey:  "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", modelName: "gpt-3.5-turbo", temperature: 0.5, streaming: true})

//   const memory = new VectorStoreRetrieverMemory({
//     // 1 is how many documents to return, you might want to return more, eg. 4
//     vectorStoreRetriever: vectorStore.asRetriever(2),
//     memoryKey: "history",
//   });

// // const prompt =
// //   PromptTemplate.fromTemplate(`As a veteran AI counselor using Motivational Interviewing (MI), your goal is to support clients in making positive changes. Remember the key components of MI: engaging, evoking change talk, and planning.
// //   Evoking Change Talk and frequently summarize the key ideas gleaned from the chat: Elicit the client's own motivation and reasons for change. Listen for change talk, which includes statements that express their desire, ability, reasons, need, or commitment to change then reflect back this change talk.
// //   You cannot begin any question with "Can.... ". You must vary your questions using different question wordsL what, how, tell me more, etc. For example, "what is important to you about ...", "how do you see yourself if you were to achieve..."
// //   Respond to clients with empathy, active listening.
// //   The following is a conversation between a motivational interviewer AI coach and a humn. The AI is listens closely and provides responses only as a motivational interviewer. If the AI does not know the answer to a question or a response is outside the bounds of a therapist client relationship, the AI truthfully says it is unable to answer.
// // Current conversation:
// // {chat_history}
// // Human: {input}
// // AI:`
// // );

// const prompt =
//   PromptTemplate.fromTemplate(`As a veteran AI counselor using Motivational Interviewing (MI), your goal is to support clients in making positive changes. Remember the key components of MI: engaging, evoking change talk, and planning.
//   Evoking Change Talk and frequently summarize the key ideas gleaned from the chat: Elicit the client's own motivation and reasons for change. Listen for change talk, which includes statements that express their desire, ability, reasons, need, or commitment to change then reflect back this change talk.
//   You cannot begin any question with "Can.... ". You must vary your questions using different question wordsL what, how, tell me more, etc. For example, "what is important to you about ...", "how do you see yourself if you were to achieve..."
//   Respond to clients with empathy, active listening.
//   The following is a conversation between a motivational interviewer AI coach and a humn. The AI is listens closely and provides responses only as a motivational interviewer. If the AI does not know the answer to a question or a response is outside the bounds of a therapist client relationship, the AI truthfully says it is unable to answer.
// Current conversation:
// {history}
// Human: {input}
// AI:`
// );
//   const chain = new LLMChain({ llm: model, prompt, memory });

  



  
// // Initializing the cors middleware
// // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//   methods: ['POST', 'GET', 'HEAD'],
// })

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {// Run the middleware
//   await runMiddleware(req, res, cors)


//   // console.log('is api', req, res)
//   try {
//     res.writeHead(200, { 
//       "Content-Type": "application/octet-stream"
//     , "Transfer-Encoding": "chunked" });
    
//     if (!OPENAI_API_KEY) {
//       throw new Error("OPENAI_API_KEY is not defined.");
//     }

//     // Call the chain with the inputs and a callback for the streamed tokens
// const result = await chain.call({ input: req.body.input }, [
//   {
//     handleLLMNewToken(token: string) {
//       res.write(token);
//     },
//   },
// ]);

// // await memory.saveContext({ input: req.body.input }, { output: result }); // or should i use res??  // // KAI CHANGED
 

//     res.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
  

//   // Rest of the API logic
//   // res.json({ message: 'Hello PUPS!' })
// }

import type { NextApiRequest, NextApiResponse } from 'next'

// import { ChatOpenAI } from "langchain/chat_models";
// import { CallbackManager } from "langchain/callbacks";

import { OpenAI } from "langchain/llms/openai";
// import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorStoreRetrieverMemory } from "langchain/memory";

const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const model= new OpenAI({  openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo", temperature: 0.5, streaming: true})

const memory = new VectorStoreRetrieverMemory({
  vectorStoreRetriever: vectorStore.asRetriever(2),
  memoryKey: "history",
});

const prompt =
  PromptTemplate.fromTemplate(`As a veteran AI counselor using Motivational Interviewing (MI), your goal is to support clients in making positive changes. Remember the key components of MI: engaging, evoking change talk, and planning.
  Evoking Change Talk and frequently summarize the key ideas gleaned from the chat: Elicit the client's own motivation and reasons for change. Listen for change talk, which includes statements that express their desire, ability, reasons, need, or commitment to change then reflect back this change talk.
  You cannot begin any question with "Can.... ". You must vary your questions using different question wordsL what, how, tell me more, etc. For example, "what is important to you about ...", "how do you see yourself if you were to achieve..."
  Respond to clients with empathy, active listening.
  The following is a conversation between a motivational interviewer AI coach and a humn. The AI is listens closely and provides responses only as a motivational interviewer. If the AI does not know the answer to a question or a response is outside the bounds of a therapist client relationship, the AI truthfully says it is unable to answer.
Current conversation:
{history}
Human: {input}
AI:`);

const chain = new LLMChain({ llm: model, prompt, memory });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Transfer-Encoding": "chunked"
  });

  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined.");
  }

  try {
    const result = await chain.call({ input: req.body.input }, [
      {
        handleLLMNewToken(token: string) {
          res.write(token);
        },
      },
    ]);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
