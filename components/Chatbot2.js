import { useState, useEffect } from "react";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = async () => {
    setChatMessages([]);

    try {
      const response = await fetch("/api/stream3");
      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const decodedValue = new TextDecoder().decode(value);
        setChatMessages((prevMessages) => [...prevMessages, decodedValue]);
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
    if (message.startsWith("```")) {
      // Triple backticks - Code block
      const code = message.substring(3, message.length - 3);
      return (
        <pre key={index} style={{ backgroundColor: "#f0f0f0" }}>
          <code>{code}</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
          >
            Copy
          </button>
        </pre>
      );
    } else if (message.startsWith("`")) {
      // Single backticks - Inline code
      const code = message.substring(1, message.length - 1);
      return (
        <code key={index} style={{ backgroundColor: "#f0f0f0" }}>
          {code}
          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
          >
            Copy
          </button>
        </code>
      );
    } else {
      // Regular text message
      return <span key={index}>{message}</span>;
    }
  };
  

  return (
    <>
      <button
        className="text-lg font-bold text-slate-500"
        onClick={handleButtonClick}
      >
        Start Stream
      </button>
      <article>
        {chatMessages && chatMessages.map(renderMessage)}
      </article>
    </>
  );
}

export default Chatbot;
