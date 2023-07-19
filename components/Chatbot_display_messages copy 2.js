
// export default Chatbot;
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyBlock, dracula } from "react-code-blocks";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [currInput, setCurrInput] = useState("");
  const [messageCount, setMessageCount] = useState(0);



  const mes = useRef();

  useEffect(() => {
    return () => {
      setChatMessages([]);
    };
  }, []);

  useEffect(() => {
    setAllMessages((prevAllMessages) => [...prevAllMessages, currInput]);
  }, [currInput]);

  const call_GPT = async (input) => {
    setAllMessages((prevAllMessages) => [...prevAllMessages, chatMessages]);

    // setChatMessages((prevMessages) => [...prevMessages, "AI: Generating response..."]);
    setChatMessages(["AI: Generating response..."]);
    console.log("messageCount", messageCount)

    try {
      var response = ''
      // if(messageCount % 2 == 0 && messageCount !== 0){
        if(messageCount % 3 == 0 && messageCount !== 0)
        {
          input = input + ".A lso at the end of your response, as my AI coach, summarize my challenges and plans so far"
          // Between two brackets, like [step1, step2, ... ] offer the top steps for me to take so far to achieve my goals"
        }
      
        response = await fetch("/api/stream_memory_embeds2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input, messageCount }),
        });

        console.log("i am summary response", response)

    // } 
    // else 
    // {

    //   response = await fetch("/api/stream_memory_embeds", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ input }),
    //   });



      const reader = response.body.getReader();
      let curr_message = "AI: ";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // setChatMessages((prevMessages) => [...prevMessages.slice(0, -1), curr_message]);
          break;
        }

        const decodedValue = new TextDecoder().decode(value);
        curr_message += decodedValue;

        setChatMessages((prevMessages) => [...prevMessages.slice(0, -1), curr_message]);
        

      }

      // setAllMessages((prevAllMessages) => [...prevAllMessages, `AI: ${curr_message}`]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setMessageCount(prevCount => prevCount + 1)
// if messsage count greater than random number bet 5-10 we ask to summarize and then make a plan
    if(messageCount % 5 == 0 && messageCount !== 0)
    {
       console.log("DIVISIBLE")
    }
    const input = mes.current.value;
    console.log(input);
    setCurrInput("HUMAN: " + input);
    call_GPT(input);
    mes.current.value = "";
  };

  return (
    <>
      <div>
        {/* <p>Ask me anything, dudette!</p>
        <input ref={mes} placeholder="ask me anything" />
        <button onClick={handleButtonClick}>Send dudette</button>
        <br /> */}
      </div>
      {allMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <ReactMarkdown
        children={chatMessages.join("\n")}
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
      <p>Ask me anything!</p>
        <input ref={mes} placeholder="ask me anything" />
        <button onClick={handleButtonClick}>Send</button>
        <br />
    </>
  );
}

export default Chatbot;
