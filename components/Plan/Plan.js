
import { useState, useEffect } from "react";
import LoadingDots from '../Loading/LoadingDots'

function Chatbot({planner, isSum}) {
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputText =  planner; 

  console.log("PLANNER IN PLANS", planner)

  const handleButtonClick = async () => {
    setButtonClicked(true);
    setIsLoading(true);
    setChatMessages([]);

    try {
      const response = await fetch("/api/plan_maker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText }),
      });

      const data = await response.json();
      var toDoSteps = data.result.replace(/[\[\]']/g, '').split(', ');
      setChatMessages(toDoSteps);
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
          padding: '3px',
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
    }}>  {!isLoading && <div>So far in our conversation, we have discussed the following possible plan: </div>}
      {chatMessages.map((message, index) => (
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

