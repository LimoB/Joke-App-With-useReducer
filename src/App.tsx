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
  { id: 1, joke: "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you...'", rate: 7 },
  { id: 2, joke: "Why are spiders so smart? They can find everything on the web!", rate: 5 },
  { id: 3, joke: "I accidentally wore a red shirt to Target and now I work here.", rate: 6 },
  { id: 4, joke: "I’m not arguing, I’m just explaining why I’m right... loudly and repeatedly.", rate: 8 },
  { id: 5, joke: "Tried cooking last night. The fire alarm was so impressed it gave me a standing ovation.", rate: 9 },
  { id: 6, joke: "I named my dog 'Five Miles' so I can say I walk Five Miles every day.", rate: 4 },
  { id: 7, joke: "Autocorrect has become my worst enema.", rate: 6 },
  { id: 8, joke: "My brain has too many tabs open. And one of them is playing music I can't find.", rate: 8 },
  { id: 9, joke: "They said 'don’t try this at home'... so I went to my friend’s house.", rate: 7 },
    { id: 1, joke: "I told my wife she was drawing her eyebrows too high. She looked surprised.", rate: 6 },
  { id: 2, joke: "Why did the scarecrow win an award? Because he was outstanding in his field.", rate: 5 },
  { id: 3, joke: "I used to play piano by ear, but now I use my hands.", rate: 7 },
  { id: 4, joke: "Why don’t eggs tell jokes? They’d crack each other up.", rate: 4 },
  { id: 5, joke: "I stayed up all night wondering where the sun went. Then it dawned on me.", rate: 6 },
  { id: 6, joke: "I asked my dog what's two minus two. He said nothing.", rate: 8 },
  { id: 7, joke: "I’m reading a book about anti-gravity. It’s impossible to put down.", rate: 5 },
  { id: 8, joke: "Why can’t your nose be 12 inches long? Because then it’d be a foot.", rate: 4 },
  { id: 9, joke: "I told my plants I love them. Now they won’t stop texting me.", rate: 7 }
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
      <h1>😂 Limo Joke Rating App</h1>

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
