

import React from 'react';

const Description = () => {
  return (
    <div style={{border: '1px solid lightblue', margin: '3px', padding: '10px'}}>
        <h2>Life Coach AI</h2>
      <p>Motivational interviewing is a counseling approach that helps people find the motivation to make positive behavior changes. It is particularly effective for people who have mixed feelings about changing their behavior. This client-centered approach empowers individuals to take responsibility for their own recovery by resolving ambivalence and increasing motivation to change.</p>
      <p>This is an experiment in developing more acccesible possibilities for client center coaching practices. We do not collect any data, however, responses are sent through an API controlled by OpenAI. Please do not share anything confidential. Also, LLMs such as ChatGPT can be bias, inappropriate and offer unsafe advice. Pleaase only use this app for experimentation/research purposes.</p>

      <a href="https://en.wikipedia.org/wiki/Motivational_interviewing">More about Motivational Interviewing</a>
    </div>
  );
}

export default Description;