import { useState, useRef } from "react";
import { mem_stream } from '../components/brains/mem_stream'
import mem_stream_server from '../components/brains/mem_stream_server'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";



export default function Index() {
    const [messages, setMessages] = useState([]);
    const mes = useRef("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("I AM MES", mes.current.value);
        // setMessages(prevMessage => [...prevMessage,mes.current.value])
        
        const resp = await mem_stream(mes.current.value)
        const resp_server = await mem_stream_server(mes.current.value)

        console.log("resp_server", resp_server)
        setMessages(prevMessage => [...prevMessage, mes.current.value,  resp.text])
    }

    return (
        <div>
            <p>Ask me anything, dude!</p>
            <input ref={mes} placeholder="ask me anything"></input>
            <button onClick={handleSubmit}>Send</button>
        <br />

            {/* <ReactMarkdown>{"## here ye here ye <br> </br>```I got nuthin dude``"}`</ReactMarkdown> */}
            {messages.map((message, index) => (
        //         <ReactMarkdown key={index} children={message} 
        // remarkPlugins={[remarkGfm]}
        // >
        <div style={{
            padding: '5px',
            // borderStyle: 'rounded'
        }}>
        <code>{message}</code>
        </div>
                //  {message} </ReactMarkdown>
            ))}

        </div>
    );
}
