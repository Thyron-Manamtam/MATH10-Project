import { useState, useEffect } from "react";
import DraggableChip from './DraggableChip';

export default function BudgetNotes({ onSubmitBudget, dayBudgetChips = [], onAddChip, onRemoveChip }) {
  const [date, setDate] = useState("");
  const [chips, setChips] = useState([]);
  const [chipTitle, setChipTitle] = useState("");
  const [chipAmount, setChipAmount] = useState("");
  const [chipCategory, setChipCategory] = useState("expense");
  const [showChipForm, setShowChipForm] = useState(false);

  // Update local chips when dayBudgetChips prop changes
  useEffect(() => {
    setChips(dayBudgetChips);
  }, [dayBudgetChips]);

  const addChip = () => {
    if (chipTitle.trim() && chipAmount.trim()) {
      const chipData = {
        title: chipTitle.trim(),
        amount: parseFloat(chipAmount),
        category: chipCategory,
        type: "daybudget"
      };
      onAddChip(chipData);
      setChipTitle("");
      setChipAmount("");
      setChipCategory("expense");
      setShowChipForm(false);
    }
  };

  const removeChip = (chipId) => {
    onRemoveChip(chipId, "daybudget");
  };

  const submitDayBudget = () => {
    if (date && chips.length > 0) {
      const total = chips.reduce((sum, chip) => {
        return chip.category === "expense" 
          ? sum - chip.amount 
          : sum + chip.amount;
      }, 0);
      
      const budgetData = {
        id: Date.now(),
        date: date,
        chips: chips,
        total: total
      };
      onSubmitBudget(budgetData);
      
      // Reset form
      setDate("");
      setChipTitle("");
      setChipAmount("");
      setChipCategory("expense");
      // Clear chips through parent
      chips.forEach(chip => onRemoveChip(chip.id, "daybudget"));
    }
  };

  const clearForm = () => {
    setDate("");
    setChipTitle("");
    setChipAmount("");
    setChipCategory("expense");
    setShowChipForm(false);
    // Clear all day budget chips
    chips.forEach(chip => onRemoveChip(chip.id, "daybudget"));
  };

  const chipsTotal = chips.reduce((sum, chip) => {
    return chip.category === "expense" 
      ? sum - chip.amount 
      : sum + chip.amount;
  }, 0);

  return (
    <div
      className="rounded-lg p-6 shadow-2xl w-full max-w-md border flex flex-col"
      style={{backgroundColor: '#A96F59', borderColor: '#7B4B36', height: '600px'}}
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
     
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Date Input */}
        <div>
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
            className="w-full py-3 rounded text-white font-medium hover:opacity-90 transition-opacity"
            style={{backgroundColor: '#A3AC8C'}}
          >
            Add Chip
          </button>
        ) : (
          <div 
            className="p-4 rounded-lg border"
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
                  setChipCategory("expense");
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
              
              <select
                value={chipCategory}
                onChange={(e) => setChipCategory(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#82896E',
                  color: '#7B4B36'
                }}
              >
                <option value="expense">Expense (-)</option>
                <option value="savings">Savings (+)</option>
              </select>
              
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
                disabled={!chipTitle.trim() || !chipAmount.trim()}
                className="w-full py-2 rounded text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{backgroundColor: '#A3AC8C'}}
              >
                Save Chip
              </button>
            </div>
          </div>
        )}

        {/* Display Chips */}
        {chips.length > 0 && (
          <div>
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
              Total: ${chipsTotal.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button - Fixed at bottom */}
      <button
        onClick={submitDayBudget}
        disabled={!date || chips.length === 0}
        className="w-full py-3 rounded text-white font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        style={{backgroundColor: '#7B4B36'}}
      >
        Submit Day Budget
      </button>
    </div>
  );
}