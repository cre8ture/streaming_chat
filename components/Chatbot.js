import { useState, useEffect } from "react";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = async () => {
    setChatMessages([]);


    console.log("chatbutton")

    try {
      const response = await fetch("/api/stream2");
      const reader = response.body.getReader();

      console.log("response", response)

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const decodedValue = new TextDecoder().decode(value);
        setChatMessages((prevMessages) => [...prevMessages, decodedValue]);
      }
    } catch (error) {
      console.log("NOOO PUP")
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      setChatMessages([]);
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
      <article>
        {chatMessages &&
          chatMessages.map((message, index) => <span key={index}>{message}</span>)}
      </article>
    </>
  );
}

export default Chatbot;
