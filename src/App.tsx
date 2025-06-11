import { useReducer, useState } from 'react';
import JokeComponent from './components/JokeComponent';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

type Action =
  | { type: 'INCREASE_RATE'; payload: { id: number } }
  | { type: 'DECREASE_RATE'; payload: { id: number } }
  | { type: 'ADD_JOKE'; payload: { joke: string } }
  | { type: 'DELETE_JOKE'; payload: { id: number } }
  | { type: 'EDIT_JOKE'; payload: { id: number; newJoke: string } };

const initialJokes: Joke[] = [
  { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything.", rate: 3 },
  { id: 2, joke: "I told my computer I needed a break, and it said 'No problem, I’ll go to sleep.'", rate: 4 },
  { id: 3, joke: "Why do cows have hooves instead of feet? Because they lactose.", rate: 2 },
  { id: 4, joke: "Parallel lines have so much in common. It’s a shame they’ll never meet.", rate: 5 },
  { id: 5, joke: "My dog stared at me for ten minutes while I ate a sandwich. I offered him a bite. He sneezed on it and walked away. Who's the real alpha now?", rate: 7 },
  { id: 6, joke: "Tried to organize my inbox... found 12,487 unread emails and decided to just move. New identity, new email.", rate: 1 },

  { id: 7, joke: "My roommate labeled all his food in the fridge, so I started labeling mine too: 'revenge', 'petty', and 'not yours'.", rate: 5 },

  { id: 8, joke: "Went on a hike to clear my mind. Got lost, panicked, and now I have 3G and inner peace.", rate: 4 },

  { id: 9, joke: "My printer made a noise like it was about to lift off. All that just to tell me it's out of paper. Dramatic much?", rate: 4 }

];

function jokeReducer(state: Joke[], action: Action): Joke[] {
  switch (action.type) {
    case 'INCREASE_RATE':
      return state.map(joke =>
        joke.id === action.payload.id ? { ...joke, rate: joke.rate + 1 } : joke
      );

    case 'DECREASE_RATE':
      return state.flatMap(joke => {
        if (joke.id === action.payload.id) {
          const newRate = joke.rate - 1;
          if (newRate < -5) {
            toast.info('Joke deleted for being too cold 🧊');
            return []; // delete the joke
          }
          return { ...joke, rate: newRate };
        }
        return joke;
      });

    case 'ADD_JOKE':
      const newId = state.length ? Math.max(...state.map(j => j.id)) + 1 : 1;
      return [...state, { id: newId, joke: action.payload.joke, rate: 0 }];

    case 'DELETE_JOKE':
      toast.warn('Joke deleted 🗑️');
      return state.filter(joke => joke.id !== action.payload.id);

    case 'EDIT_JOKE':
      toast.success('Joke updated ✍️');
      return state.map(joke =>
        joke.id === action.payload.id ? { ...joke, joke: action.payload.newJoke } : joke
      );

    default:
      return state;
  }
}

function App() {
  const [jokes, dispatch] = useReducer(jokeReducer, initialJokes);
  const [newJoke, setNewJoke] = useState('');
  const maxChars = 150;

  const handleAddJoke = () => {
    const trimmedJoke = newJoke.trim();
    if (!trimmedJoke) return;

    if (trimmedJoke.length > maxChars) {
      toast.error(`Joke cannot exceed ${maxChars} characters.`);
      return;
    }

    dispatch({ type: 'ADD_JOKE', payload: { joke: trimmedJoke } });
    setNewJoke('');
    toast.success('Joke added successfully! 😂');
  };

  return (
    <div className="App">
      <h1>😂 Joke Rating App</h1>

      <div style={{ marginBottom: '1rem' }}>
        <textarea
          value={newJoke}
          onChange={(e) => setNewJoke(e.target.value)}
          placeholder="Write your joke here..."
          rows={3}
          maxLength={maxChars}
          style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        />
        <div style={{ textAlign: 'right', fontSize: '14px', color: newJoke.length >= maxChars ? 'red' : 'gray' }}>
          {newJoke.length} / {maxChars}
        </div>
        <button
          className="btn btn-add"
          onClick={handleAddJoke}
          style={{ marginTop: '8px' }}
        >
          ➕ Add Joke
        </button>
      </div>

      {jokes.map(joke => (
        <JokeComponent
          key={joke.id}
          joke={joke}
          increaseRate={(id) => dispatch({ type: 'INCREASE_RATE', payload: { id } })}
          decreaseRate={(id) => dispatch({ type: 'DECREASE_RATE', payload: { id } })}
          onDelete={(id) => dispatch({ type: 'DELETE_JOKE', payload: { id } })}
          onEdit={(id, newJoke) => dispatch({ type: 'EDIT_JOKE', payload: { id, newJoke } })}
        />
      ))}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
