import React, { useState, useRef } from 'react';

const ChatInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputExpanded, setInputExpanded] = useState(false);
  const inputRef = useRef(null);

  const handleReset = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleMouseEnter(e)
  };

  const handleMouseEnter = (e) => {
    setInputExpanded(true);
    e.target.style.transform = 'scale(1.2)';
  };

  const handleMouseLeave = (e) => {
    if(!inputValue){
    setInputExpanded(false);
    e.target.style.transform = 'scale(1)'
  };
}

  return (
    <div>
      <p>Ask me anything!</p>
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



export default ChatInput