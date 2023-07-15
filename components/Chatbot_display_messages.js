// import { useState, useRef, useEffect} from "react";

// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// // import SyntaxHighlighter from "react-syntax-highlighter";
// // import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// import { CopyBlock, dracula } from "react-code-blocks";

// function Chatbot() {
//   const [chatMessages, setChatMessages] = useState('');
//   const [allMessages, setAllMessages] = useState([]);
//   const [currInput, setCurrInput] = useState('');


//   const mes = useRef("");




// var code_chunks = []

//     // useEffect(()=>{
//     //   console.log("GETTING RESPONSE ... ")
//     // handleButtonClick()
//     // }, [])

//   const handleButtonClick = async (e) => {
//     e.preventDefault()
//     const input = mes.current.value
//     // console.log(input)
//     // await setCurrInput("HUMAN " + input)
//     // setChatMessages('');
//     // setAllMessages((prevAllMessages) => [...prevAllMessages, "HUMAN: " + input])
//   // await setAllMessages((prevAllMessages) => [...prevAllMessages, "HUMAN: " + input])// +  curr_message] )

//    await call_GPT(input)
//   }

//   const call_GPT = async (input) => {

//     var flag = 1;

//     var curr_message = ''
//     try {
//       const response = await fetch("/api/stream_memory_embeds", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input }),
//       });
      
//       const reader = response.body.getReader();


//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) {
//           setAllMessages((prevAllMessages) => [...prevAllMessages, "AI: " +  curr_message] )
//           break;
//         }
//         const decodedValue = new TextDecoder().decode(value);
        
//         if(flag){
//           await setAllMessages((prevAllMessages) => [...prevAllMessages, "HUMAN: " + input])// +  curr_message] )
//           flag = 0
//         }

//         setChatMessages((prevMessages) => prevMessages + " " + decodedValue);
//         curr_message = curr_message + decodedValue 



//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   useEffect(() => {

//     return () => {
//       setChatMessages('');

//     };
//   }, []);

//   useEffect(()=>
 
//   { setAllMessages((prevAllMessages) => [...prevAllMessages, currInput])}, 
//   [currInput])

 


//   return (
//     <>
//       <div>
//             <p>Ask me anything, dudette!</p>
//             <input ref={mes} placeholder="ask me anything"></input>
//             <button onClick={handleButtonClick}>Send dudette</button>
//         <br />
//         </div>
//         {allMessages.map((message, index) => (
//       index < allMessages.length -1 && <p key={index}>{message}</p>
//     ))}
//       <ReactMarkdown
//         children={chatMessages}
//         remarkPlugins={[remarkGfm]}
//         components={{
//           code({ node, inline, className, children, ...props }) {
//             const match = /language-(\w+)/.exec(className || "");
//             return !inline && match ? (
//               <CopyBlock
//                 text={String(children).replace(/\n$/, "")}
//                 language={match[1]}
//                 showLineNumbers
//                 theme={dracula}
//                 wrapLines
//                 {...props}
//               />
//             ) : (
//               <code className={className} {...props}>
//                 {children}
//               </code>
//             );
//           },
//         }}
//       />


//     </>
//   );
// }


// export default Chatbot;



// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { CopyBlock, dracula } from "react-code-blocks";

// function Chatbot() {
//   const [chatMessages, setChatMessages] = useState("");
//   const [allMessages, setAllMessages] = useState([]);
//   const [currInput, setCurrInput] = useState("");

//   const mes = useRef("");

//   useEffect(() => {
//     return () => {
//       setChatMessages("");
//     };
//   }, []);

//   useEffect(() => {
//     setAllMessages((prevAllMessages) => [...prevAllMessages, currInput]);
//   }, [currInput]);


//   const call_GPT = async (input) => {
//     // setChatMessages((prevMessages) => prevMessages + "AI: ");
//     setChatMessages("AI: ");
//     console.log("allMessages", allMessages)


//     var temp_messages = allMessages;

//     temp_messages.push(chatMessages)

//     try {
//       const response = await fetch("/api/stream_memory_embeds", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input }),
//       });
  
//       const reader = response.body.getReader();
//       let curr_message = "";
  
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) {
//       //  setAllMessages((prevAllMessages) => [...prevAllMessages, chatMessages]);

//           break;
//         }
  
//         const decodedValue = new TextDecoder().decode(value);
//         // curr_message += decodedValue;
  
//         // Check if the AI response is complete
//         // if (curr_message.includes("AI:")) {
          

//           // setAllMessages((prevAllMessages) => [...prevAllMessages, curr_message]);
//           setChatMessages((prevMessages) => prevMessages + decodedValue);
//           temp_messages[temp_messages.length-1]  =  chatMessages 
//           console.log("i am temp_messages", temp_messages)
//           setAllMessages(temp_messages)

//           // curr_message = "";
//         // }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const handleButtonClick = async (e) => {
//     e.preventDefault();
//     const input = mes.current.value;
//     console.log(input);
//     setCurrInput("HUMAN: " + input);
//     call_GPT(input);
//   };

//   return (
//     <>
//       <div>
//         <p>Ask me anything, dudette!</p>
//         <input ref={mes} placeholder="ask me anything" />
//         <button onClick={handleButtonClick}>Send dudette</button>
//         <br />
//       </div>
//       {allMessages.map((message, index) => (
//         <p key={index}>{message}</p>
//       ))}
//       {chatMessages && (
//         <ReactMarkdown
//           children={chatMessages}
//           remarkPlugins={[remarkGfm]}
//           components={{
//             code({ node, inline, className, children, ...props }) {
//               const match = /language-(\w+)/.exec(className || "");
//               return !inline && match ? (
//                 <CopyBlock
//                   text={String(children).replace(/\n$/, "")}
//                   language={match[1]}
//                   showLineNumbers
//                   theme={dracula}
//                   wrapLines
//                   {...props}
//                 />
//               ) : (
//                 <code className={className} {...props}>
//                   {children}
//                 </code>
//               );
//             },
//           }}
//         />
//       )}
//     </>
//   );
// }

// export default Chatbot;
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyBlock, dracula } from "react-code-blocks";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [currInput, setCurrInput] = useState("");

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


    try {
      const response = await fetch("/api/stream_memory_embeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

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
    const input = mes.current.value;
    console.log(input);
    setCurrInput("HUMAN: " + input);
    call_GPT(input);
    mes.current.value = "";
  };

  return (
    <>
      <div>
        <p>Ask me anything, dudette!</p>
        <input ref={mes} placeholder="ask me anything" />
        <button onClick={handleButtonClick}>Send dudette</button>
        <br />
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
    </>
  );
}

export default Chatbot;
