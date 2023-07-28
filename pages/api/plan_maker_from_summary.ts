import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// import { ChatOpenAI } from "langchain/chat_models";
// import { CallbackManager } from "langchain/callbacks";

import { OpenAI } from "langchain/llms/openai";

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
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
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
    const result = await llm.call("given this list of challenges, come up with a simple plan to help somone resolve these challenges. Output should be a list like [step1, step2, ... ,]" + req.body.input );
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
