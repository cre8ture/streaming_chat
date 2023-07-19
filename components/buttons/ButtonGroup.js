import React, { useState } from 'react';

const ButtonGroup = () => {
  const [messages, setMessages] = useState(['Message 1', 'Message 2', 'Message 3']);
  const [isCopied, setIsCopied] = useState(false);

  const handleButtonClick = (index) => {
    setIsCopied(false);

    // Simulating checkmark animation
    const tempMessages = [...messages];
    tempMessages[index] = '✓';
    setMessages(tempMessages);

    setTimeout(() => {
      tempMessages[index] = `Message ${index + 1}`;
      setMessages(tempMessages);
    }, 1000);
  };

  const handleCopyClick = () => {
    setIsCopied(true);
    const messagesText = messages.join('\n');
    navigator.clipboard.writeText(messagesText);
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
  };

  const handleShareClick = () => {
    const emailBody = messages.join('\n');
    window.location.href = `mailto:?body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="button-group">
      {messages.map((message, index) => (
        <button
          key={index}
          className={`button-icon ${isCopied && index === 0 ? 'copied' : ''}`}
          onClick={() => handleButtonClick(index)}
        >
          {message}
        </button>
      ))}

      <button className="button-icon" onClick={handleCopyClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Copy icon SVG path */}
        </svg>
      </button>

      <button className="button-icon" onClick={handleDownloadClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Download icon SVG path */}
        </svg>
      </button>

      <button className="button-icon" onClick={handleShareClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Share icon SVG path */}
        </svg>
      </button>
    </div>
  );
};

export default ButtonGroup;
