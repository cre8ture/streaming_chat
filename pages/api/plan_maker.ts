import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { ChatOpenAI } from "langchain/chat_models";
import { CallbackManager } from "langchain/callbacks";

import { OpenAI } from "langchain/llms/openai";
// import { ConversationSummaryMemory } from "langchain/memory";
// import { LLMChain } from "langchain/chains";
// import { PromptTemplate } from "langchain/prompts";

// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { VectorStoreRetrieverMemory } from "langchain/memory";

// const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());



const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const llm = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
});

  
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {// Run the middleware
  await runMiddleware(req, res, cors)


  // console.log('is api', req, res)
  try {

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined.");
    }
    const result = await llm.call("Analyze the text below, if it's a summarization, then turn the summary into a series of TO DO steps for a TO DO list. Only use what's in the summary so as not to add extraneous steps. If there's nothing to make plans about, just state that you cannot come up with a plan yet but we should keep conversing so we can generate one together. Output this in a javascript list [`step1', 'step2', ..., 'step3'] " + "Text to analyze: " + req.body.input );
    // console.log("I AM THE RES", result)
    res.status(200).json({ result });
    // return result
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

  // Rest of the API logic
  // res.json({ message: 'Hello PUPS!' })
}
