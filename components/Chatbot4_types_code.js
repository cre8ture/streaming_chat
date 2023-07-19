import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyBlock, dracula } from "react-code-blocks";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState('');

var code_chunks = []

  const handleButtonClick = async () => {
    setChatMessages('');


    try {
      const response = await fetch("/api/stream3");
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
      <button
        className="text-lg font-bold text-slate-500"
        onClick={handleButtonClick}
      >
        Start Stream
      </button>
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
