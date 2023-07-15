import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = async () => {
    setChatMessages([]);

    let buffer = "";
    try {
      const response = await fetch("/api/stream3");
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const decodedValue = new TextDecoder().decode(value);
        buffer += decodedValue;
        const lastNewLineIndex = buffer.lastIndexOf("\n\n");
        if (lastNewLineIndex !== -1) {
          const message = buffer.slice(0, lastNewLineIndex);
          setChatMessages((prevMessages) => [...prevMessages, message]);
          buffer = buffer.slice(lastNewLineIndex);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      setChatMessages([]);
    };
  }, []);

  const renderMessage = (message, index) => {
    return <ReactMarkdown children={message} remarkPlugins={[remarkGfm]} />;
  };

  return (
    <>
      <button
        className="text-lg font-bold text-slate-500"
        onClick={handleButtonClick}
      >
        Start Stream
      </button>
      <article>{chatMessages && chatMessages.map(renderMessage)}</article>
    </>
  );
}

export default Chatbot;
