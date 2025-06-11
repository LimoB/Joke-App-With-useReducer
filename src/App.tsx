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
  | { type: 'DELETE_JOKE'; payload: { id: number } };

const initialJokes: Joke[] = [
  { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything.", rate: 3 },
  { id: 2, joke: "I told my computer I needed a break, and it said 'No problem, I’ll go to sleep.'", rate: 4 },
  { id: 3, joke: "Why do cows have hooves instead of feet? Because they lactose.", rate: 2 },
  { id: 4, joke: "Parallel lines have so much in common. It’s a shame they’ll never meet.", rate: 5 },
  { id: 5, joke: "I'm reading a book on anti-gravity. It's impossible to put down.", rate: 1 }
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
      return state.filter(joke => joke.id !== action.payload.id);

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
        />
      ))}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
