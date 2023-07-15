import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { CallbackManager } from "langchain/callbacks";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
) {
  // Run the middleware
  await runMiddleware(req, res, cors)


  console.log('is api', req)
  try {
    res.writeHead(200, { 
      "Content-Type": "application/octet-stream"
    , "Transfer-Encoding": "chunked" });
    
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined.");
    }

    console.log("i am in the head")
    let s = "";
    const chatStreaming = new ChatOpenAI({
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
          // console.clear();
          // s += token;
          // console.log(s);
          // handleNewToken(token);
          res.write(`${token}`)
        },
      }),
    });

    // const responseD = await chatStreaming.call([
    //   new HumanChatMessage("Write me a song about sparkling water."),
    // ]);

    // function handleNewToken(token) {
    //   res.write(`${token}`);
    // }

    await chatStreaming.call([
      new SystemChatMessage(
        "You are an expert software coder of every language"),
      new HumanChatMessage("Write me code in C++ to effectively sort a string of text and then reverse it")
    ]);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

  // Rest of the API logic
  res.json({ message: 'Hello PUPS!' })
}
