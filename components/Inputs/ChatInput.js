
import React, { useState, useRef, useEffect } from 'react';
import Tooltip from '../Tooltips/Tooltip'

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

//   var textarea = document.querySelector('textarea');

// textarea.addEventListener('keydown', autosize);


function autosize(e) {
  var el = e.target;
  setTimeout(function () {
    el.style.height = 'auto';
    el.style.padding = '5';
    el.style.height = el.scrollHeight + 'px';
  }, 0);
}


  return (
    <div>
      {messages.length === 0 && (
        <p ref={pRef} style={{ transition: 'transform 0.5s' }}>
          Ask me anything!
        </p>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!inputExpanded && (
           <Tooltip text="Reset chat">
          <button onClick={handleReset} style={{ marginRight: '8px' }}>
            Reset
          </button>
         </Tooltip>
        )}
        <textarea
         onInput={autosize}
          ref={inputRef}
          placeholder="ask me anything"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{
            padding: '3px',
            paddingRight: '65px',
            width: '300px',
            height: 'auto', // Set height to auto to allow textarea to expand based on content
            minHeight: '28px', // Set the minimum height to 28px (1 line) when no content
            transition: 'transform 0.5s',
            transformOrigin: 'left bottom',
            // transformOrigin: 'right top',

            borderRadius: '8px',
            resize: 'none', // Prevent manual resizing of the textarea
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
