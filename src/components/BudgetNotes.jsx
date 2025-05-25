import { useState } from "react";

export default function BudgetNotes({ onSubmitBudget }) {
  const [date, setDate] = useState("");
  const [chips, setChips] = useState([]);
  const [chipTitle, setChipTitle] = useState("");
  const [chipAmount, setChipAmount] = useState("");

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
  };

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

      {/* Day Budget Chip Form */}
      <div 
        className="mb-4 p-4 rounded-lg border"
        style={{backgroundColor: '#DDCBB7', borderColor: '#82896E'}}
      >
        <h3 className="font-medium mb-3" style={{color: '#7B4B36'}}>
          Day Budget Chip
        </h3>
        
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

      {/* Display Chips */}
      {chips.length > 0 && (
        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-2">Budget Items:</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {chips.map((chip) => (
              <div 
                key={chip.id}
                className="flex justify-between items-center p-2 rounded text-xs"
                style={{backgroundColor: '#DDCBB7', color: '#7B4B36'}}
              >
                <span className="font-medium">{chip.title}</span>
                <div className="flex items-center gap-2">
                  <span>${chip.amount.toFixed(2)}</span>
                  <button
                    onClick={() => removeChip(chip.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
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