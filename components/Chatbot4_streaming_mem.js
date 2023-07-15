import { useState, useRef, useEffect} from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyBlock, dracula } from "react-code-blocks";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState('');
  const mes = useRef("");




var code_chunks = []

    // useEffect(()=>{
    //   console.log("GETTING RESPONSE ... ")
    // handleButtonClick()
    // }, [])

  const handleButtonClick = async (e) => {
    e.preventDefault()
    const input = mes.current.value
    console.log(input)
    // setChatMessages('');


    try {
      const response = await fetch("/api/stream_memory_embeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
      
      const reader = response.body.getReader();


      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const decodedValue = new TextDecoder().decode(value);


        setChatMessages((prevMessages) => prevMessages + " " + decodedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {

    return () => {
      setChatMessages('');

    };
  }, []);

 


  return (
    <>
      <div>
            <p>Ask me anything, dudette!</p>
            <input ref={mes} placeholder="ask me anything"></input>
            <button onClick={handleButtonClick}>Send dudette</button>
        <br />
        </div>
      <ReactMarkdown
        children={chatMessages}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CopyBlock
                text={String(children).replace(/\n$/, "")}
                language={match[1]}
                showLineNumbers
                theme={dracula}
                wrapLines
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </>
  );
}


export default Chatbot;
