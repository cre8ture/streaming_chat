import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputExpanded, setInputExpanded] = useState(false);
  const inputRef = useRef(null);
  const pRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (inputExpanded) {
      pRef.current.style.transform = 'translate(10%, 100%)';
    } else {
      pRef.current.style.transform = 'translate(0, 0)';
    }
  }, [inputExpanded]);

  const handleReset = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
      onSend(e);
    }
  };

  const handleMouseEnter = (e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setInputExpanded(true);
      e.target.style.transform = 'scale(1.4)';
    }, 0);
  };

  const handleMouseLeave = (e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!inputValue) {
        setInputExpanded(false);
        e.target.style.transform = 'scale(1)';
      }
    }, 500);
  };

  return (
    <div>
      <p ref={pRef} style={{ transition: 'transform 0.5s' }}>
        Ask me anything!
      </p>
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            padding: '3px',
            width: '300px',
            height: '28px',
            transition: 'transform 0.3s',
            transformOrigin: 'left bottom',
            borderRadius: '8px',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {inputValue && (
          <button
            onClick={onSend}
            style={{
              marginLeft: '0px',
              position: 'relative',
              left: '-2px',
              marginBottom: '8px',
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
