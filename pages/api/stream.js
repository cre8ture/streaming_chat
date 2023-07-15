// https://nextjs.org/docs/app/building-your-application/routing/router-handlers#static-route-handlers
import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { CallbackManager } from "langchain/callbacks";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {

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
          handleNewToken(token);
        },
      }),
    });

    // const responseD = await chatStreaming.call([
    //   new HumanChatMessage("Write me a song about sparkling water."),
    // ]);

    function handleNewToken(token) {
      res.write(`${token}`);
    }

    await chatStreaming.call([
      new SystemChatMessage(
        "You are a poet like tennyson, kipling, frost. You're famous and enjoyed by many."),
      new HumanChatMessage("Write me a poem that rhymes about traveling from Mississippi to London for the first time.")
    ]);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
