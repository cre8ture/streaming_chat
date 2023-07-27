
// export default Chatbot;
import { useState, useRef, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyBlock, dracula } from "react-code-blocks";

import ChatInput from '../Inputs/ChatInput'
import Audio from '../Audio/Audio'

import Tooltip from "../Tooltips/Tooltip";

import styles from './Chat.module.css'



function Chatbot( {setMessagesForDisplay, setPlanner, setIsSum2}) {
  const [chatMessages, setChatMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [currInput, setCurrInput] = useState("");
  const [currSummary, setCurrSummary] = useState("");
  const [currMessage, setCurrMessage] = useState("");


  const [messageCount, setMessageCount] = useState(0);





  const mes = useRef();
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);


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
    // console.log("messageCount", messageCount)

    try {
      var response = ''
      // if(messageCount % 2 == 0 && messageCount !== 0){

        if(messageCount === 2 || messageCount === 4 || messageCount === 6)
        {
          input = input + ". At the end of your response, as my AI coach, summarize my challenges and plans so far"
          // Between two brackets, like [step1, step2, ... ] offer the top steps for me to take so far to achieve my goals"
        }
   
      
        response = await fetch("/api/stream_memory_embeds2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input, messageCount }),
        });




      const reader = response.body.getReader();
      let curr_message = "AI: ";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setCurrMessage(curr_message)
          // setChatMessages((prevMessages) => [...prevMessages.slice(0, -1), curr_message]);
          setMessagesForDisplay((prevMessages) => [...allMessages, curr_message])
          if(messageCount === 2 || messageCount === 4 || messageCount === 6)
          {
            setCurrSummary(curr_message)
            // setIsSum2(true)

            setPlanner(curr_message)
          }
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

  const handleButtonClick = async (mes) => {
    // e.preventDefault();


    setMessageCount(prevCount => prevCount + 1)
// if messsage count greater than random number bet 5-10 we ask to summarize and then make a plan
    const input = mes //mes.current.value;
    // console.log(input);
    setCurrInput("HUMAN: " + input);
    call_GPT(input);
    // mes.current.value = "";
  };

  return (
    <>
 <div
  style={{
  }}
>
      </div>

      {/* <div style={{border: '1px solid lightblue', margin: '3px', padding: '5px'}}> */}
      <div >

      {allMessages.map((message, index) => (
        <p   style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          lineHeight: '1.1',
        }}
        key={index}>{message}</p>
      ))}
      <div
      
      ref={messagesEndRef}
      
      >
      <ReactMarkdown
  children={chatMessages.join("\n")}
  remarkPlugins={[remarkGfm]}
  className={styles.markdown}
  components={{
    p: ({ node, ...props }) => (
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          lineHeight: '1.1',
         }}
        {...props}
      />
    ),
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

      </div>
      <div
    
      >
   
        <div style={{
          display: 'flex', alignItems: 'center'}}>
        </div>
        <br />
        <div style={{
          display: 'flex', alignItems: 'center'}}>
        {/* <ChatInput onSend={handleButtonClick} setChatMessages={setChatMessages} setMessages={setAllMessages} messages={allMessages}/>
        {chatMessages && <Audio text={"hello I'm puffer!"}/>} */}

<div style={{ flex: '1' }}>
          <ChatInput onSend={handleButtonClick} setChatMessages={setChatMessages} setMessages={setAllMessages} messages={allMessages}/>
          { (
          <div style={{ marginLeft: '1px',marginTop: '1px' }}>
           <Tooltip text="Dictate AI Responses"> <Audio text={currMessage}/></Tooltip>
          </div>
        )}
        </div>
   


        </div>
        </div>

        <br />
        </div>

    </>
  );
}

// type="text"
// style={{
//   transition: 'transform 0.3s',
//   transformOrigin: 'right top',
// }}
// onMouseEnter={(e) => (e.target.style.transform = 'scale(2)')}
// onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}

export default Chatbot;
