import {
  CacheClient,
  Configurations,
  CredentialProvider,
} from "@gomomento/sdk";
import { BufferMemory } from "langchain/memory";
// import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { ChatOpenAI } from "langchain/chat_models";
import { CallbackManager } from "langchain/callbacks";

import { OpenAI } from "langchain/llms/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";


import { ConversationChain } from "langchain/chains";
import { MomentoChatMessageHistory } from "langchain/stores/message/momento";

// //"eyJlbmRwb2ludCI6ImNlbGwtdXMtZWFzdC0xLTEucHJvZC5hLm1vbWVudG9ocS5jb20iLCJhcGlfa2V5IjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKemRXSWlPaUpyWVdzeU5UazBRR2N1YUdGeWRtRnlaQzVsWkhVaUxDSjJaWElpT2pFc0luQWlPaUpEUVVFOUluMC5jTWhrTW5waVFsbDBCdVlzNnRybVlqUlZETUllVzAwNm9JMG1TU1EtNXZRIn0=" //MOMENTO_AUTH_TOKEN",
    // authToken: "eyJlbmRwb2ludCI6ImNlbGwtdXMtZWFzdC0xLTEucHJvZC5hLm1vbWVudG9ocS5jb20iLCJhcGlfa2V5IjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKemRXSWlPaUpyWVdzeU5UazBRR2N1YUdGeWRtRnlaQzVsWkhVaUxDSjJaWElpT2pFc0luQWlPaUpEUVVFOUluMC5jTWhrTW5waVFsbDBCdVlzNnRybVlqUlZETUllVzAwNm9JMG1TU1EtNXZRIn0=",
// import { prompt_MI2 } from '../../components/data/prompt'
// See https://github.com/momentohq/client-sdk-javascript for connection options
console.log("MOMENTO_AUTH_TOKEN", process.env.MOMENTO_AUTH_TOKEN);
console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY)

const OPENAI_API_KEY_new = process.env.OPENAI_API_KEY

const client = new CacheClient({
  configuration: Configurations.Laptop.v1(),
  credentialProvider: CredentialProvider.fromEnvironmentVariable({
    environmentVariableName: MOMENTO_AUTH_TOKEN 
  }),
  defaultTtlSeconds: 60 * 60 * 24,
});

// Create a unique session ID
const sessionId = new Date().toISOString();
const cacheName = "langchain";

const memory2 = new BufferMemory({
  chatHistory: await MomentoChatMessageHistory.fromProps({
    client,
    cacheName,
    sessionId,
    sessionTtl: 300,
  }),
});
console.log(
  `cacheName=${cacheName} and sessionId=${sessionId} . This will be used to store the chat history. You can inspect the values at your Momento console at https://console.gomomento.com.`
);



const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const model= new OpenAI({  openAIApiKey: OPENAI_API_KEY_new, modelName: "gpt-3.5-turbo", temperature: 0, streaming: true})

  // const memory = new ConversationSummaryMemory({
  //   memoryKey: "chat_history",
  //   llm: model,
  // });

  // const prompt =
  //   PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

  // Current conversation:
  // {chat_history}
  // Human: {input}
  // AI:`);

  const prompt =
  PromptTemplate.fromTemplate(`As an AI counselor using Motivational Interviewing (MI), your goal is to support clients in making positive changes. Remember the key components of MI: engaging, evoking change talk, and planning.

  Engaging: Establish a trusting and respectful relationship with the client. Show genuine interest and use open-ended questions, affirmations, reflections, and summaries to understand their perspective.
  
  Evoking Change Talk: Elicit the client's own motivation and reasons for change. Listen for change talk, which includes statements that express their desire, ability, reasons, need, or commitment to change then reflect back this change talk. Here are some examples of change talk:
  
  Always summarize the conversation after a few back and forths. 
  Desire: "I want to quit smoking because it's bad for my health."
  Ability: "I know I can lose weight if I put my mind to it."
  Reasons: "If I stop drinking, I'll have more energy and be more productive at work."
  Need: "I need to start exercising regularly to lower my blood pressure."
  Commitment: "I'm going to start eating healthier from now on."
  Taking steps: "I've already cut back on junk food and started eating more fruits and vegetables."
  Planning: Collaborate with the client to develop a specific action plan for change. Help them resolve ambivalence, strengthen commitment, and formulate realistic and achievable goals. Negotiate goals, methods, and anticipate barriers. Provide support and resources.
  As the AI counselor, remember to create a non-judgmental space, listen actively for change talk, and convey empathy. Utilize the skills of MI, such as open-ended questions, affirmations, reflections, and summaries to guide the counseling process.
  
  Vary your questions. Offer to summarize the conversation so far. 
  Imagine you are a veteran AI counselor using MI. Respond to clients with empathy, active listening, and guidance, focusing on engaging, evoking change talk, and planning.
  The following is a conversation between a motivational interviewer AI coach and a humn. The AI is listens closely and provides responses only as a motivational interviewer. If the AI does not know the answer to a question or a response is outside the bounds of a therapist client relationship, the AI truthfully says it is unable to answer.

Current conversation:
{chat_history}
Human: {input}
AI:`);
  const chain = new LLMChain({ llm: model, prompt, memory2 });


// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req,
  res,
  fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req,
  res
) {// Run the middleware
  await runMiddleware(req, res, cors)


  // console.log('is api', req, res)
  try {
    res.writeHead(200, { 
      "Content-Type": "application/octet-stream"
    , "Transfer-Encoding": "chunked" });
    
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined.");
    }

    // Call the chain with the inputs and a callback for the streamed tokens
const result = await chain.call({ input: req.body.input }, [
  {
    handleLLMNewToken(token) {
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
