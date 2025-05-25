import { useState } from "react";

export default function BudgetNotes() {
  const [notes, setNotes] = useState("");

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const clearNotes = () => {
    setNotes("");
  };

  return (
    <div 
      className="rounded-lg p-6 shadow-2xl w-full max-w-md border h-fit"
      style={{backgroundColor: '#A96F59', borderColor: '#7B4B36'}}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Budget Tracker Notes</h2>
        <button
          onClick={clearNotes}
          className="text-white hover:text-gray-200 text-sm px-3 py-1 rounded-md transition-colors"
          style={{backgroundColor: '#7B4B36'}}
        >
          Clear
        </button>
      </div>
      
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder={`Write your budget notes here...
• Track your expenses
• Set spending goals
• Note important calculations
• Plan your budget`}
        className="w-full h-80 p-4 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder-[#82896E]"
        style={{
          backgroundColor: '#DDCBB7',
          borderColor: '#82896E',
          color: '#7B4B36',
          focusRingColor: '#82896E'
        }}
      />
      
      <div className="mt-3 text-right">
        <span className="text-white text-sm opacity-75">
          {notes.length} characters
        </span>
      </div>
    </div>
  );
}
