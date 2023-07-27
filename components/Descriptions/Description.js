import React, { useState, useEffect } from 'react';

const Description = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Set a small delay to initiate the fade-in effect
    const timeout = setTimeout(() => {
      setShouldShow(true);
    }, 100);

    // Clean up the timeout on unmount to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        border: '1px solid lavender',
        padding: '8px',
        boxSizing: 'border-box',
        opacity: shouldShow ? 1 : 0,
        transition: 'opacity 1s ease-in', // CSS transition for opacity change
      }}
    >
      <h2
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          lineHeight: '1.1',
        }}
      >
        Life Coach AI
      </h2>
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          lineHeight: '1.1',
        }}
      >
        Motivational interviewing is a counseling approach that helps people find the motivation to make positive behavior changes. It is particularly effective for people who have mixed feelings about changing their behavior. This client-centered approach empowers individuals to take responsibility for their own recovery by resolving ambivalence and increasing motivation to change.
      </p>
      <p
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          lineHeight: '1.1',
        }}
      >
        This is an experiment in developing more accessible possibilities for client center coaching practices. We do not collect any data, however, responses are sent through an API controlled by OpenAI. Please do not share anything confidential. Also, LLMs such as ChatGPT can be biased, inappropriate, and offer unsafe advice. Please only use this app for experimentation/research purposes.
      </p>

      <a
        style={{
          fontFamily: 'monospace',
          fontSize: '18px',
          lineHeight: '1.1',
        }}
        href="https://en.wikipedia.org/wiki/Motivational_interviewing"
      >
        More about Motivational Interviewing
      </a>
    </div>
  );
}

export default Description;
