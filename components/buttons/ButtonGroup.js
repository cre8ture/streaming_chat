import React, { useState } from 'react';

const checkmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"  width='16' h-'16'>
  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
</svg> `;

const ButtonGroup = ({ messages }) => {
  const [clickedButtons, setClickedButtons] = useState([false, false, false]);
  const [isClicked, setIsClicked] = useState(0);



  const handleClick = (index) => {
    // setClickedButtons((prevClickedButtons) => {
      setIsClicked(index)
    //   const newClickedButtons = [...prevClickedButtons];
    //   // newClickedButtons[index] = true;
      setTimeout(() => {
        setIsClicked(0)
      }, 1000);
      // return newClickedButtons;
    };
  

  const handleCopyClick = () => {
    const messagesText = messages.join('\n');
    navigator.clipboard.writeText(messagesText);
    handleClick(1);
  };

  const handleDownloadClick = () => {
    const messagesText = messages.join('\n');
    const element = document.createElement('a');
    const file = new Blob([messagesText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'messages.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    handleClick(2);
  };

  const handleShareClick = () => {
    const emailBody = messages.join('\n');
    window.location.href = `mailto:?body=${encodeURIComponent(emailBody)}`;
    handleClick(3);
  };

  return (
    <div className="button-group">
      <button
        className="button-icon"
        onClick={handleCopyClick}
        style={{
          margin: 'auto',
          paddingTop: '1px',
          background: 'white',
          border: 'none',
          cursor: 'pointer', // Add cursor style here
        }}
        // Add hover style here
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.cursor = 'pointer';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.cursor = 'default';
        }}
      >
        {/* Copy icon SVG path */}
        {isClicked === 1 ? (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="16" // Fix the attribute name
    height="16" // Fix the attribute name
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
) : (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="16"
    height="16" // Fix the attribute name
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
    />
  </svg>
)}

      </button>

      <button
        className="button-icon"
        onClick={handleDownloadClick}
        style={{
          margin: 'auto',
          paddingTop: '1px',
          background: 'white',
          border: 'none',
          cursor: 'pointer', // Add cursor style here
        }}
        // Add hover style here
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.cursor = 'pointer';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.cursor = 'default';
        }}
      >
        {/* Download icon SVG path */}
        {isClicked === 2? (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="16"
    height="16" // Fix the attribute name
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
) : (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width="16"
    height="16" // Fix the attribute name
  >
    <path
      d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"
    />
    <path
      d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"
    />
  </svg>
)}

        
      </button>

      <button
        className="button-icon"
        onClick={handleShareClick}
        style={{
          margin: 'auto',
          paddingTop: '1px',
          background: 'white',
          border: 'none',
          cursor: 'pointer', // Add cursor style here
        }}
        // Add hover style here
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.cursor = 'pointer';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.cursor = 'default';
        }}
      >
        {/* Share icon SVG path */}
        {isClicked === 3? (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="16" // Fix the attribute name
    height="16" // Fix the attribute name
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
) : ( <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="16"
          height="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>)}
      
      </button>
    </div>
  );
};

export default ButtonGroup;
