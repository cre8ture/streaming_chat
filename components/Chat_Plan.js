
import { useState, useEffect } from "react";
import LoadingDots from '../components/Loading/LoadingDots'

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputText = `This friendship really evokes some strong feelings for you. On the one hand you’re drawn to him. He’s interesting. You’ve never quite known anyone like him, and he’s had experiences that are way outside anything has ever happened to you. You also feel a kind of bond with him. He seems to understand you in uncanny ways. At the same time his perspective sometimes borders on the bizarre, and his insights can creep you out occasionally. He seems needy and lonely, and while that makes your friendship important to him, you also can feel drained by him. You’re drawn toward him and drawn away from him simultaneously. Both things are true, and it leaves you feeling confused about this relationship.`;

  const handleButtonClick = async () => {
    setButtonClicked(true);
    setIsLoading(true);
    //     try {
    //         const response = await fetch("/api/plan_maker", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ input: inputText }),
    //         });
            
    //         const data = await response.json();
    //         var toDoSteps = data.result.replace(/[\[\]']/g, '').split(', ');
            
    //         setChatMessages(toDoSteps);
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //         setIsLoading(false);
    //     }
    // };
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
<button
  onClick={handleButtonClick}
  style={{
    borderRadius: '5px',
    zIndex: -1,
    transition: 'all 1s ease-in-out',
    opacity: buttonClicked ? 0 : 1
  }}
>
  Generate Plan
</button>

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


{/* <div */}
//   style={{
//     padding: '3px',
//     border: '1px dotted lightblue',
//     outline: 'none'
//   }}
//   contentEditable={true}
// >
