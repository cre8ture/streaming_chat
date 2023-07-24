// import React, { useState, useRef, useEffect } from 'react';

// const ChatInput = ({ onSend, setMessages, setChatMessages, messages }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [inputExpanded, setInputExpanded] = useState(false);
//   const inputRef = useRef(null);
//   const pRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//   if(messages.length === 0){
//     if (inputExpanded) {
//       pRef.current.style.transform = 'translate(10%, 100%)';
//     } else {
//       pRef.current.style.transform = 'translate(0, 0)';
//     }}
//   }, [inputExpanded]);

//   const handleReset = () => {
//     setInputValue('');
//     setMessages([])
//     setChatMessages([])
//     if (inputRef.current) {
//       inputRef.current.value = '';
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       onSend(inputRef.current.value);
//       setInputValue('');
//     if (inputRef.current) {
//       inputRef.current.value = '';
//     }
//     }
//   };

//   const handleMouseClick = (e) => {
//     onSend(inputRef.current.value);
//     setInputValue('');
//   if (inputRef.current) {
//     inputRef.current.value = '';
//   }
//   } 

//   const handleMouseEnter = (e) => {
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setInputExpanded(true);
//       e.target.style.transform = 'scale(1.4)';
//     }, 0);
//   };

//   const handleMouseLeave = (e) => {
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       if (!inputValue) {
//         setInputExpanded(false);
//         e.target.style.transform = 'scale(1)';
//       }
//     }, 500);
//   };
//   return (
//     <div>
//       {messages.length === 0 &&<p ref={pRef} style={{ transition: 'transform 0.5s' }}>
//          Ask me anything!
//       </p>}
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         {!inputExpanded && (
//           <button onClick={handleReset} style={{ marginRight: '8px' }}>
//             Reset
//           </button>
//         )}
//         <input
//           ref={inputRef}
//           placeholder="ask me anything"
//           type="text"
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           style={{
//             padding: '3px',
//             paddingRight: '65px',
//             width: '300px',
//             height: '28px',
//             transition: 'transform 0.5s',
//             transformOrigin: 'left bottom',
//             borderRadius: '8px',
//           }}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         />
//         {inputValue && (
//           <button
//             onClick={handleMouseClick}
//             style={{
//               marginLeft: '0px',
//               position: 'relative',
//               left: '70px',
//               marginBottom: '12px',
//               zIndex: 1,
//             }}
//           >
//             Send
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatInput;

import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend, setMessages, setChatMessages, messages }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputExpanded, setInputExpanded] = useState(false);
  const inputRef = useRef(null);
  const pRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      if (inputExpanded) {
        pRef.current.style.transform = 'translate(10%, 100%) scale(1.4)';
      } else {
        pRef.current.style.transform = 'translate(0, 0) scale(1)';
      }
    }
  }, [inputExpanded, messages.length]);

  const handleReset = () => {
    setInputValue('');
    setMessages([]);
    setChatMessages([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputExpanded(!!e.target.value); // Set inputExpanded to true if there's any text in the input
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSend(inputRef.current.value);
      setInputValue('');
      setInputExpanded(false); // Reset inputExpanded when Enter is pressed
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleMouseClick = (e) => {
    onSend(inputRef.current.value);
    setInputValue('');
    setInputExpanded(false); // Reset inputExpanded when Send button is clicked
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setInputExpanded(true);
      if (inputRef.current) {
        inputRef.current.style.transform = 'scale(1.4)';
      }
    }, 0);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!inputValue && !inputRef.current?.matches(':focus')) {
        setInputExpanded(false);
        if (inputRef.current) {
          inputRef.current.style.transform = 'scale(1)';
        }
      }
    }, 500);
  };

  const handleInputFocus = () => {
    setInputExpanded(true);
    if (inputRef.current) {
      inputRef.current.style.transform = 'scale(1.4)';
    }
  };

  const handleInputBlur = () => {
    setInputExpanded(!!inputValue); // Set inputExpanded to true if there's any text in the input when it loses focus
    if (!inputValue) {
      if (inputRef.current) {
        inputRef.current.style.transform = 'scale(1)';
      }
    }
  };

  return (
    <div>
      {messages.length === 0 && (
        <p ref={pRef} style={{ transition: 'transform 0.5s' }}>
          Ask me anything!
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!inputExpanded && (
          <button onClick={handleReset} style={{ marginRight: '8px' }}>
            Reset
          </button>
        )}
        <input
          ref={inputRef}
          placeholder="ask me anything"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{
            padding: '3px',
            paddingRight: '65px',
            width: '300px',
            height: '28px',
            transition: 'transform 0.5s',
            transformOrigin: 'left bottom',
            borderRadius: '8px',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {inputValue && (
          <button
            onClick={handleMouseClick}
            style={{
              marginLeft: '0px',
              position: 'relative',
              left: '70px',
              marginBottom: '12px',
              zIndex: 1,
            }}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
