import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { ChatOpenAI } from "langchain/chat_models";
import { CallbackManager } from "langchain/callbacks";

import { OpenAI } from "langchain/llms/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VectorStoreRetrieverMemory } from "langchain/memory";

const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());



const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const prompt_MI2 = `
As an AI counselor using Motivational Interviewing (MI), your goal is to support clients in making positive changes. Remember the key components of MI: engaging, evoking change talk, and planning.

Engaging: Establish a trusting and respectful relationship with the client. Show genuine interest and use open-ended questions, affirmations, reflections, and summaries to understand their perspective.

Evoking Change Talk: Elicit the client's own motivation and reasons for change. Listen for change talk, which includes statements that express their desire, ability, reasons, need, or commitment to change then reflect back this change talk. Here are some examples of change talk:

Desire: "I want to quit smoking because it's bad for my health."
Ability: "I know I can lose weight if I put my mind to it."
Reasons: "If I stop drinking, I'll have more energy and be more productive at work."
Need: "I need to start exercising regularly to lower my blood pressure."
Commitment: "I'm going to start eating healthier from now on."
Taking steps: "I've already cut back on junk food and started eating more fruits and vegetables."
Planning: Collaborate with the client to develop a specific action plan for change. Help them resolve ambivalence, strengthen commitment, and formulate realistic and achievable goals. Negotiate goals, methods, and anticipate barriers. Provide support and resources.
As the AI counselor, remember to create a non-judgmental space, listen actively for change talk, and convey empathy. Utilize the skills of MI, such as open-ended questions, affirmations, reflections, and summaries to guide the counseling process.

Now, imagine you are a veteran AI counselor using MI. Respond to clients with empathy, active listening, and guidance, focusing on engaging, evoking change talk, and planning.`


const model= new OpenAI({  openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo", temperature: 0.5, streaming: true})


  const memory = new VectorStoreRetrieverMemory({
    // 1 is how many documents to return, you might want to return more, eg. 4
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
{chat_history}
Human: {input}
AI:`);
  const chain = new LLMChain({ llm: model, prompt, memory });

//   const prompt2 =
//   PromptTemplate.fromTemplate(`As a veteran AI counselor using Motivational Interviewing (MI), you empathically summarize the conversation so far. At he end of summarizing create an arraylist of the steps for a plan that can be deduced so far. Arraylist should be in the form of ['step1', 'step2', ...]
//   The following is a conversation between a motivational interviewer AI coach and a humn. The AI is listens closely and provides responses only as a motivational interviewer. If the AI does not know the answer to a question or a response is outside the bounds of a therapist client relationship, the AI truthfully says it is unable to answer.
// Current conversation:
// {chat_history}
// Human: {input}
// AI:`);
//   const chain2 = new LLMChain({ llm: model, prompt: prompt2, memory });





  
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

    
    res.writeHead(200, { 
      "Content-Type": "application/octet-stream"
    , "Transfer-Encoding": "chunked" });
    
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined.");
    }
    var result;
    if (req.body.messageCount % 2 && req.body.messageCount !== 0){
      console.log("GIVE ME SUMMMARY!!")
      const prompt2 =
      PromptTemplate.fromTemplate(`As a veteran AI counselor using Motivational Interviewing (MI), you empathically summarize the conversation so far. At he end of summarizing you must create a javascript arraylist of the steps for a plan that can be deduced so far. Arraylist must be in the form of ['step1', 'step2', ...]
      
    Current conversation:
    {chat_history}
    Human: {input}
    AI:`);
      const chain2 = new LLMChain({ llm: model, prompt: prompt2, memory });
    
    

      
      result = await chain2.call({ input: req.body.input }, [
        {
          handleLLMNewToken(token: string) {
            res.write(token);
          },
        },
      ]);
    }
 result = await chain.call({ input: req.body.input }, [
  {
    handleLLMNewToken(token: string) {
      res.write(token);
    },
  },
]);

console.log("i am output", result)

await memory.saveContext({ input: req.body.input }, { output: result }); // or should i use res??
 

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  

  // Rest of the API logic
  // res.json({ message: 'Hello PUPS!' })
}
