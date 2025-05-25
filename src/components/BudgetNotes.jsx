import { useState } from "react";
import DraggableChip from './DraggableChip';

export default function BudgetNotes({ onSubmitBudget, onAddChipToDay }) {
  const [date, setDate] = useState("");
  const [chips, setChips] = useState([]);
  const [chipTitle, setChipTitle] = useState("");
  const [chipAmount, setChipAmount] = useState("");
  const [showChipForm, setShowChipForm] = useState(false);

  const addChip = () => {
    if (chipTitle.trim() && chipAmount.trim()) {
      const newChip = {
        id: Date.now(),
        title: chipTitle.trim(),
        amount: parseFloat(chipAmount)
      };
      setChips([...chips, newChip]);
      setChipTitle("");
      setChipAmount("");
      setShowChipForm(false);
    }
  };

  const removeChip = (chipId) => {
    setChips(chips.filter(chip => chip.id !== chipId));
  };

  const submitDayBudget = () => {
    if (date && chips.length > 0) {
      const budgetData = {
        id: Date.now(),
        date: date,
        chips: chips,
        total: chips.reduce((sum, chip) => sum + chip.amount, 0)
      };
      onSubmitBudget(budgetData);
      
      // Reset form
      setDate("");
      setChips([]);
      setChipTitle("");
      setChipAmount("");
    }
  };

  const clearForm = () => {
    setDate("");
    setChips([]);
    setChipTitle("");
    setChipAmount("");
    setShowChipForm(false);
  };

  // Handle adding chip from calculator
  const addChipFromCalculator = (chipData) => {
    if (chipData.type === "daybudget") {
      const newChip = {
        id: Date.now(),
        title: chipData.title,
        amount: chipData.amount
      };
      setChips([...chips, newChip]);
    }
  };

  // Expose the function to parent component
  if (onAddChipToDay) {
    onAddChipToDay.current = addChipFromCalculator;
  }

  return (
    <div
      className="rounded-lg p-6 shadow-2xl w-full max-w-md border h-fit"
      style={{backgroundColor: '#A96F59', borderColor: '#7B4B36'}}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Day Budget</h2>
        <button
          onClick={clearForm}
          className="text-white hover:text-gray-200 text-sm px-3 py-1 rounded-md transition-colors"
          style={{backgroundColor: '#7B4B36'}}
        >
          Clear
        </button>
      </div>
     
      {/* Date Input */}
      <div className="mb-4">
        <label className="block text-white text-sm font-medium mb-2">
          Date (MM-DD-YYYY)
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            backgroundColor: '#DDCBB7',
            borderColor: '#82896E',
            color: '#7B4B36'
          }}
        />
      </div>

      {/* Add Chip Button or Day Budget Chip Form */}
      {!showChipForm ? (
        <button
          onClick={() => setShowChipForm(true)}
          className="w-full mb-4 py-3 rounded text-white font-medium hover:opacity-90 transition-opacity"
          style={{backgroundColor: '#A3AC8C'}}
        >
          Add Chip
        </button>
      ) : (
        <div 
          className="mb-4 p-4 rounded-lg border"
          style={{backgroundColor: '#DDCBB7', borderColor: '#82896E'}}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium" style={{color: '#7B4B36'}}>
              Day Budget Chip
            </h3>
            <button
              onClick={() => {
                setShowChipForm(false);
                setChipTitle("");
                setChipAmount("");
              }}
              className="text-red-600 hover:text-red-800 font-bold text-lg"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title (e.g., Groceries, Gas)"
              value={chipTitle}
              onChange={(e) => setChipTitle(e.target.value)}
              className="w-full p-2 rounded border focus:outline-none"
              style={{
                backgroundColor: 'white',
                borderColor: '#82896E',
                color: '#7B4B36'
              }}
            />
            
            <input
              type="number"
              step="0.01"
              placeholder="Amount ($)"
              value={chipAmount}
              onChange={(e) => setChipAmount(e.target.value)}
              className="w-full p-2 rounded border focus:outline-none"
              style={{
                backgroundColor: 'white',
                borderColor: '#82896E',
                color: '#7B4B36'
              }}
            />
            
            <button
              onClick={addChip}
              className="w-full py-2 rounded text-white font-medium hover:opacity-90 transition-opacity"
              style={{backgroundColor: '#A3AC8C'}}
            >
              Save Chip
            </button>
          </div>
        </div>
      )}

      {/* Display Chips */}
      {chips.length > 0 && (
        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-2">Budget Items (Drag to Calculator):</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {chips.map((chip) => (
              <DraggableChip 
                key={chip.id}
                chip={chip}
                onRemove={removeChip}
              />
            ))}
          </div>
          <div 
            className="mt-2 p-2 rounded text-center font-bold"
            style={{backgroundColor: '#A3AC8C', color: 'white'}}
          >
            Total: ${chips.reduce((sum, chip) => sum + chip.amount, 0).toFixed(2)}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={submitDayBudget}
        disabled={!date || chips.length === 0}
        className="w-full py-3 rounded text-white font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        style={{backgroundColor: '#7B4B36'}}
      >
        Submit Day Budget
      </button>
    </div>
  );
}