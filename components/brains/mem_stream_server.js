import { OpenAI } from "langchain/llms/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const model= new OpenAI({  openAIApiKey: "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", modelName: "gpt-3.5-turbo", temperature: 0})

  const memory = new ConversationSummaryMemory({
    memoryKey: "chat_history",
    llm: model,
  });

  const prompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

  Current conversation:
  {chat_history}
  Human: {input}
  AI:`);
  const chain = new LLMChain({ llm: model, prompt, memory, stream: true });

  

  export async function mem_stream(input){

  const res1 = await chain.call({ input: input });
  console.log({ res1, memory: await memory.loadMemoryVariables({}) });
  /*
  {
    res1: {
      text: " Hi Jim, I'm AI! It's nice to meet you. I'm an AI programmed to provide information about the environment around me. Do you have any specific questions about the area that I can answer for you?"
    },
    memory: {
      chat_history: 'Jim introduces himself to the AI and the AI responds, introducing itself as a program designed to provide information about the environment. The AI offers to answer any specific questions Jim may have about the area.'
    }
  }
  */
  return res1
}

export const getServerSideProps = async (input) => {
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const repo = await res.json()
    // return { props: { repo } }

    
  const res1 = await chain.call({ input: input });
    console.log({ res1, memory: await memory.loadMemoryVariables({}) });

    // return res1
    return { props: { res1 } }

  }
   
  export default function mem_stream_server({ repo }) {
    return repo
  }