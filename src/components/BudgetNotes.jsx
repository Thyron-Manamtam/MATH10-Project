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
      style={{
        backgroundColor: '#997C70',
        borderColor: '#7B4B36',
        height: '600px',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-semibold">
          Day Budget
        </h2>
        <button
          onClick={clearForm}
          className="px-3 py-1 text-sm font-medium rounded hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: '#DDCBB7',
            color: '#7B4B36'
          }}
        >
          Clear
        </button>
      </div>
     
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Date Input */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded border focus:outline-none"
            style={{
              backgroundColor: '#DDCBB7',
              borderColor: '#5F6550',
              color: '#7B4B36'
            }}
          />
        </div>

        {/* Add Chip Button or Day Budget Chip Form */}
        {!showChipForm ? (
          <button
            onClick={() => setShowChipForm(true)}
            className="w-full py-3 rounded font-semibold hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#5F6550',
              color: 'white'
            }}
          >
            + Add Budget Item
          </button>
        ) : (
          <div 
            className="p-4 rounded border"
            style={{ backgroundColor: '#DDCBB7', borderColor: '#5F6550' }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 
                className="font-semibold"
                style={{ color: '#7B4B36' }}
              >
                New Budget Item
              </h3>
              <button
                onClick={() => {
                  setShowChipForm(false);
                  setChipTitle("");
                  setChipAmount("");
                  setChipCategory("expense");
                }}
                className="w-6 h-6 rounded flex items-center justify-center hover:opacity-80 transition-opacity font-bold"
                style={{
                  backgroundColor: '#997C70',
                  color: 'white'
                }}
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
                className="w-full p-2 rounded border focus:outline-none text-sm"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#5F6550',
                  color: '#7B4B36'
                }}
              />
              
              <select
                value={chipCategory}
                onChange={(e) => setChipCategory(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none text-sm"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#5F6550',
                  color: '#7B4B36'
                }}
              >
                <option value="expense">Expense (-)</option>
                <option value="savings">Income (+)</option>
              </select>
              
              <input
                type="number"
                step="0.01"
                placeholder="Amount ($)"
                value={chipAmount}
                onChange={(e) => setChipAmount(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none text-sm"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#5F6550',
                  color: '#7B4B36'
                }}
              />
              
              <button
                onClick={addChip}
                disabled={!chipTitle.trim() || !chipAmount.trim()}
                className="w-full py-2 rounded font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                style={{
                  backgroundColor: '#5F6550',
                  color: 'white'
                }}
              >
                Save Item
              </button>
            </div>
          </div>
        )}

        {/* Display Chips */}
        {chips.length > 0 && (
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">
              Budget Items (Drag to Calculator):
            </h4>
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
              className="mt-4 p-3 rounded text-center font-bold border"
              style={{
                backgroundColor: chipsTotal >= 0 ? '#5F6550' : '#B16A5C',
                color: 'white',
                borderColor: chipsTotal >= 0 ? '#82896E' : '#991b1b'
              }}
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
        className="w-full py-3 rounded font-bold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        style={{
          backgroundColor: !date || chips.length === 0 ? '#7B4B36' : '#5F6550',
          color: 'white'
        }}
      >
        Submit Day Budget
      </button>
    </div>
  );
}