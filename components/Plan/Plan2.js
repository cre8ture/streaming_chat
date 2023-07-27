
import { useState, useEffect } from "react";
import LoadingDots from '../Loading/LoadingDots'

function Chatbot({planner, isSum}) {
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlan, setIsPlan] = useState(false);


  const inputText = planner; 

  console.log("PLANNER IN PLANS", planner)

  const handleButtonClick = async () => {
    setButtonClicked(true);
    setIsLoading(true);
    setChatMessages([]);
    setIsPlan(false)

    try {
      var response = await fetch("/api/summarize_issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText }),
      });

      // const data = await response.json();
      const data2 = await response.json();
      console.log("summary",data2)
      const jsonString = JSON.stringify(data2);


      if(data2.result.indexOf('0') === -1){
         response = await fetch("/api/plan_maker_from_summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: jsonString }),
        });
      

      const data = await response.json();
      console.log("plan from api",data)

      var toDoSteps = data.result.replace(/[\[\]']/g, '').split(', ');
      setChatMessages(toDoSteps);
      setIsPlan(true)
      }

    else{
      setChatMessages(["Keep chatting with the coach to build a plan!"]);

    }
    setIsLoading(false);

    } catch (error) {
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
{planner && <button
  onClick={handleButtonClick}
  style={{
    borderRadius: '5px',
    zIndex: -1,
    transition: 'all 1s ease-in-out',
    // opacity: buttonClicked ? 0 : 1
  }}
>
  Generate Plan
</button>}

      {buttonClicked&&<div
        style={{
            zIndex:1,
          padding: '5px',
          fontFamily: 'monospace',
          fontSize: '18px', 
          lineHeight: '1.1',
          color: 'blue',
          border: '1px dotted lightblue',
          outline: 'none',
          maxHeight: buttonClicked ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 1s ease-in-out'
        }}
        contentEditable={true}
      >
        {isLoading && <LoadingDots />}
    {buttonClicked && <div
    style={{
        opacity: buttonClicked ? '1' : '0',

        transition: 'max-height 1s ease-in-out'
    }}>  { !isLoading && isPlan ? (<div>So far in our conversation, we have discussed the following possible plan: </div>)
  : (!isLoading &&<div> 
    We need to keep chatting to create a plan together
    </div>)
    }
      {isPlan && !isLoading && chatMessages?.map((message, index) => (
  <div style={{ padding: '3px', marginBottom: '0.5em',  }} key={index}>
  {index + 1}. {message}
</div>
  ))}
</div>}

</div>}
    </>
  );
}

export default Chatbot;

