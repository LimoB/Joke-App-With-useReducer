import React from 'react';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

interface JokeComponentProps {
  joke: Joke;
  increaseRate: (id: number) => void;
  decreaseRate: (id: number) => void;
}

const JokeComponent: React.FC<JokeComponentProps> = ({ joke, increaseRate, decreaseRate }) => {
  return (
    <div
      className="joke"
      style={{
        backgroundColor: '#f0f0f0', // Changed from white to light gray
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        color: '#333', // Darker text
      }}
    >
      <p
        className="joke-text"
        style={{
          fontSize: '16px',
          marginBottom: '0.5rem',
          lineHeight: '1.5',
        }}
      >
        {joke.joke}
      </p>

      <div
        className="joke-info"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Rating: {joke.rate}</span>
        <div className="joke-buttons">
          <button
            className="btn btn-sm"
            style={{ marginRight: '0.5rem' }}
            onClick={() => increaseRate(joke.id)}
          >
            👍
          </button>
          <button
            className="btn btn-sm"
            onClick={() => decreaseRate(joke.id)}
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokeComponent;
