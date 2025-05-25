import { useState, useEffect } from "react";
import DraggableChip from "./DraggableChip";
// BudgetNotes Component
export default function BudgetNotes({ onSubmitBudget, dayBudgetChips = [], onAddChip, onRemoveChip }) {
  const [date, setDate] = useState("");
  const [chips, setChips] = useState([]);
  const [chipTitle, setChipTitle] = useState("");
  const [chipAmount, setChipAmount] = useState("");
  const [chipCategory, setChipCategory] = useState("expense");
  const [showChipForm, setShowChipForm] = useState(false);

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
      
      setDate("");
      setChipTitle("");
      setChipAmount("");
      setChipCategory("expense");
      chips.forEach(chip => onRemoveChip(chip.id, "daybudget"));
    }
  };

  const clearForm = () => {
    setDate("");
    setChipTitle("");
    setChipAmount("");
    setChipCategory("expense");
    setShowChipForm(false);
    chips.forEach(chip => onRemoveChip(chip.id, "daybudget"));
  };

  const chipsTotal = chips.reduce((sum, chip) => {
    return chip.category === "expense" 
      ? sum - chip.amount 
      : sum + chip.amount;
  }, 0);

  return (
    <div
      className="rounded-lg p-6 shadow-2xl w-full max-w-md border-4 flex flex-col relative"
      style={{
        backgroundColor: '#F2EDE6',
        borderColor: '#8B4513',
        height: '600px',
        fontFamily: "'Times New Roman', serif",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D2B48C' fill-opacity='0.08'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z'/%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      {/* Vintage letterhead */}
      <div className="text-center mb-6 border-b-2 pb-4" style={{ borderColor: '#8B4513' }}>
        <h2 className="text-xl font-bold mb-1" style={{ 
          color: '#2F1B14',
          fontFamily: "'Times New Roman', serif",
          textShadow: '1px 1px 2px rgba(139, 69, 19, 0.3)'
        }}>
          Daily Budget Letter
        </h2>
        <div className="text-xs italic" style={{ color: '#8B4513' }}>
          Personal Financial Correspondence
        </div>
        <button
          onClick={clearForm}
          className="absolute top-6 right-6 px-3 py-1 text-sm font-medium rounded hover:opacity-80 transition-opacity border-2"
          style={{
            backgroundColor: '#8B4513',
            color: '#F9F7F4',
            borderColor: '#654321'
          }}
        >
          Clear
        </button>
      </div>
     
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Date Input with vintage styling */}
        <div>
          <label className="block text-sm font-medium mb-2 italic" style={{ color: '#2F1B14' }}>
            Date of Correspondence
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded border-2 focus:outline-none"
            style={{
              backgroundColor: '#F9F7F4',
              borderColor: '#8B4513',
              color: '#2F1B14',
              fontFamily: "'Times New Roman', serif",
              boxShadow: 'inset 2px 2px 4px rgba(139, 69, 19, 0.1)'
            }}
          />
        </div>

        {/* Add Chip Button or Day Budget Chip Form */}
        {!showChipForm ? (
          <button
            onClick={() => setShowChipForm(true)}
            className="w-full py-3 rounded font-semibold hover:opacity-90 transition-opacity border-2"
            style={{
              backgroundColor: '#8B4513',
              color: '#F9F7F4',
              borderColor: '#654321',
              fontFamily: "'Times New Roman', serif",
              boxShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
            }}
          >
            + Compose New Entry
          </button>
        ) : (
          <div 
            className="p-4 rounded border-2 relative"
            style={{ 
              backgroundColor: '#F9F7F4', 
              borderColor: '#8B4513',
              backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.03) 50%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)',
              backgroundSize: '8px 8px'
            }}
          >
            {/* Wax seal decoration */}
            <div 
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-3 flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #8B4513 0%, #654321 100%)',
                borderColor: '#2F1B14'
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F9F7F4' }} />
            </div>

            <div className="flex justify-between items-center mb-3">
              <h3 
                className="font-bold italic"
                style={{ color: '#2F1B14', fontFamily: "'Times New Roman', serif" }}
              >
                New Financial Entry
              </h3>
              <button
                onClick={() => {
                  setShowChipForm(false);
                  setChipTitle("");
                  setChipAmount("");
                  setChipCategory("expense");
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity font-bold border-2"
                style={{
                  backgroundColor: '#2F1B14',
                  color: '#F9F7F4',
                  borderColor: '#8B4513'
                }}
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Description (e.g., Market provisions, Carriage fare)"
                value={chipTitle}
                onChange={(e) => setChipTitle(e.target.value)}
                className="w-full p-2 rounded border-2 focus:outline-none text-sm"
                style={{
                  backgroundColor: '#F9F7F4',
                  borderColor: '#8B4513',
                  color: '#2F1B14',
                  fontFamily: "'Times New Roman', serif",
                  boxShadow: 'inset 1px 1px 3px rgba(139, 69, 19, 0.1)'
                }}
              />
              
              <select
                value={chipCategory}
                onChange={(e) => setChipCategory(e.target.value)}
                className="w-full p-2 rounded border-2 focus:outline-none text-sm"
                style={{
                  backgroundColor: '#F9F7F4',
                  borderColor: '#8B4513',
                  color: '#2F1B14',
                  fontFamily: "'Times New Roman', serif"
                }}
              >
                <option value="expense">Expenditure (-)</option>
                <option value="savings">Revenue (+)</option>
              </select>
              
              <input
                type="number"
                step="0.01"
                placeholder="Amount ($)"
                value={chipAmount}
                onChange={(e) => setChipAmount(e.target.value)}
                className="w-full p-2 rounded border-2 focus:outline-none text-sm"
                style={{
                  backgroundColor: '#F9F7F4',
                  borderColor: '#8B4513',
                  color: '#2F1B14',
                  fontFamily: "'Times New Roman', serif",
                  boxShadow: 'inset 1px 1px 3px rgba(139, 69, 19, 0.1)'
                }}
              />
              
              <button
                onClick={addChip}
                disabled={!chipTitle.trim() || !chipAmount.trim()}
                className="w-full py-2 rounded font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm border-2"
                style={{
                  backgroundColor: '#8B4513',
                  color: '#F9F7F4',
                  borderColor: '#654321',
                  fontFamily: "'Times New Roman', serif"
                }}
              >
                Seal & Record Entry
              </button>
            </div>
          </div>
        )}

        {/* Display Chips */}
        {chips.length > 0 && (
          <div>
            <h4 className="text-sm font-bold mb-3 italic" style={{ color: '#2F1B14' }}>
              Financial Entries (Drag to Calculator):
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
              className="mt-4 p-3 rounded text-center font-bold border-2 relative"
              style={{
                backgroundColor: chipsTotal >= 0 ? '#8B4513' : '#8B0000',
                color: '#F9F7F4',
                borderColor: chipsTotal >= 0 ? '#654321' : '#660000',
                fontFamily: "'Times New Roman', serif"
              }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2" style={{ borderColor: '#F9F7F4' }} />
              <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2" style={{ borderColor: '#F9F7F4' }} />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2" style={{ borderColor: '#F9F7F4' }} />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2" style={{ borderColor: '#F9F7F4' }} />
              
              Balance: ${chipsTotal.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button - Fixed at bottom with vintage styling */}
      <button
        onClick={submitDayBudget}
        disabled={!date || chips.length === 0}
        className="w-full py-3 rounded font-bold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4 border-2 relative"
        style={{
          backgroundColor: !date || chips.length === 0 ? '#8B4513' : '#654321',
          color: '#F9F7F4',
          borderColor: '#2F1B14',
          fontFamily: "'Times New Roman', serif",
          boxShadow: '2px 2px 6px rgba(47, 27, 20, 0.4)'
        }}
      >
        {/* Decorative flourishes */}
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xs">❦</span>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs">❦</span>
        Submit Daily Correspondence
      </button>
    </div>
  );
}