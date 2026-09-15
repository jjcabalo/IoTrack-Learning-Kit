import { useState } from 'react';
import { useScore } from '../context/ScoreContext';

export default function NameModal() {
  const { studentName, saveName } = useScore();
  const [inputName, setInputName] = useState('');

  // If we already have a name, do not show the modal
  if (studentName) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim().length > 1) {
      saveName(inputName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="bg-background border border-border p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-2">Welcome to IoTrack!</h2>
        <p className="text-muted-foreground mb-6">
          Please enter your name to begin the course. This will be used to record your scores.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Your Full Name"
            className="px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand text-foreground"
            required
            autoFocus
          />
          <button 
            type="submit"
            className="w-full bg-brand hover:bg-brand/90 text-brand-foreground py-3 rounded-xl font-semibold transition-colors shadow-glow"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
}
