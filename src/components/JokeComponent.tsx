import React, { useState } from 'react';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

interface JokeComponentProps {
  joke: Joke;
  increaseRate: (id: number) => void;
  decreaseRate: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newJoke: string) => void;
}

const JokeComponent: React.FC<JokeComponentProps> = ({
  joke,
  increaseRate,
  decreaseRate,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(joke.joke);

  const handleSave = () => {
    const trimmed = editedText.trim();
    if (trimmed) {
      onEdit(joke.id, trimmed);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="joke"
      style={{
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        color: '#333',
      }}
    >
      {isEditing ? (
        <>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '0.5rem', fontSize: '16px' }}
          />
          <div style={{ marginTop: '0.5rem' }}>
            <button
              className="btn btn-sm"
              style={{ marginRight: '0.5rem' }}
              onClick={handleSave}
            >
              💾 Save
            </button>
            <button className="btn btn-sm" onClick={() => setIsEditing(false)}>
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
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
                style={{ marginRight: '0.5rem' }}
                onClick={() => decreaseRate(joke.id)}
              >
                👎
              </button>
              <button
                className="btn btn-sm"
                style={{ marginRight: '0.5rem' }}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-sm"
                onClick={() => onDelete(joke.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JokeComponent;
