// import React, { useState, useRef } from 'react';

// const SpeechReader = ({ text }) => {
//   const [inputText, setInputText] = useState(text);
//   const isSpeakingRef = useRef(false);
//   const [isHighlighted, setIsHighlighted] = useState(false);


// console.log("currMessage", text)
//   const readText = (text) => {
//     if ('speechSynthesis' in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       speech.onend = () => {
//         isSpeakingRef.current = false;
//       };
//       window.speechSynthesis.speak(speech);
//       isSpeakingRef.current = true;
//     }
//   };

//   const handleButtonClick = () => {
//     if (!isSpeakingRef.current && inputText) {
//       readText(inputText);
//     }
//     setIsHighlighted((prevState) => !prevState); // Toggle the highlight state
//   };

//   return (
//     <div>
//       <button
//         onClick={handleButtonClick}
//         style={{
//           cursor: 'pointer',
//           background: isHighlighted ? 'darkblue' : 'none', // Change the background color based on isHighlighted state
//           color: isHighlighted ? 'white' : 'black', // Change the text color based on isHighlighted state
//         }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           style={{ width: '20px', height: '20px', marginTop: '3px' }}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default SpeechReader;
import React, { useState, useRef, useEffect } from 'react';

const SpeechReader = ({ text }) => {
  const [inputText, setInputText] = useState(text);
  const isSpeakingRef = useRef(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    // When the 'text' prop changes, automatically read the new text
    setInputText(text);
    // readText(text);
    readText(text.substring(4))
  }, [text]);

  const readText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => {
        isSpeakingRef.current = false;
      };
      window.speechSynthesis.speak(speech);
      isSpeakingRef.current = true;
    }
  };

  const handleButtonClick = () => {
    if (!isSpeakingRef.current && inputText) {
      readText(inputText);
    }
    setIsHighlighted((prevState) => !prevState); // Toggle the highlight state
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        style={{
          cursor: 'pointer',
          background: isHighlighted ? 'darkblue' : 'none',
          color: isHighlighted ? 'white' : 'black',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: '20px', height: '20px', marginTop: '3px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      </button>
    </div>
  );
};

export default SpeechReader;
