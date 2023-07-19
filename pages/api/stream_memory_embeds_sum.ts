import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
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

const model= new OpenAI({  openAIApiKey: "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", modelName: "gpt-3.5-turbo", temperature: 0.5, streaming: true})


  const memory = new VectorStoreRetrieverMemory({
    // 1 is how many documents to return, you might want to return more, eg. 4
    vectorStoreRetriever: vectorStore.asRetriever(2),
    memoryKey: "history",
  });

const prompt =
  PromptTemplate.fromTemplate(`As a veteran AI counselor using Motivational Interviewing (MI), you empathically summarize the conversation so far. At he end of summarizing create an arraylist of the steps for a plan that can be deduced so far. Arraylist should be in the form of ['step1', 'step2', ...]
  The following is a conversation between a motivational interviewer AI coach and a humn. The AI is listens closely and provides responses only as a motivational interviewer. If the AI does not know the answer to a question or a response is outside the bounds of a therapist client relationship, the AI truthfully says it is unable to answer.
Current conversation:
{chat_history}
Human: {input}
AI:`);
  const chain = new LLMChain({ llm: model, prompt, memory });



  
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined.");
    }

    const result = await chain.call({ input: req.body.input }, [
      {
        handleLLMNewToken(token: string) {
          res.write(token);
        },
      },
    ]);

    await memory.saveContext({ input: req.body.input }, { output: result });

    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Transfer-Encoding": "chunked",
    });

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

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

// const result = await chain.call({ input: req.body.input }, [
//   {
//     handleLLMNewToken(token: string) {
//       res.write(token);
//     },
//   },
// ]);

// await memory.saveContext({ input: req.body.input }, { output: result }); // or should i use res??
 

//     res.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
  
// }
