import { useState, useEffect } from "react";

// ChipCreator Component
function ChipCreator({ onCreateChip, defaultAmount = null }) {
  const [chipTitle, setChipTitle] = useState("");
  const [chipDate, setChipDate] = useState("");
  const [chipType, setChipType] = useState("daybudget");
  const [chipAmount, setChipAmount] = useState(defaultAmount ? String(defaultAmount) : "");

  useEffect(() => {
    if (defaultAmount !== null) {
      setChipAmount(String(defaultAmount));
    }
  }, [defaultAmount]);

  const handleSubmit = () => {
    const finalAmount = defaultAmount !== null ? defaultAmount : parseFloat(chipAmount);
    
    if (chipTitle.trim() && !isNaN(finalAmount) && finalAmount !== null) {
      onCreateChip({
        title: chipTitle.trim(),
        type: chipType,
        amount: Math.abs(finalAmount), // Store absolute value
        category: finalAmount >= 0 ? "savings" : "expense" // Auto-determine category
      });
      setChipTitle("");
      setChipDate("");
      if (defaultAmount === null) {
        setChipAmount("");
      }
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Item description..."
        value={chipTitle}
        onChange={(e) => setChipTitle(e.target.value)}
        className="w-full p-3 rounded border-2 text-sm"
        style={{
          backgroundColor: '#F9F7F4', 
          borderColor: '#8B4513', 
          color: '#2F1B14',
          fontFamily: "'Times New Roman', serif",
          boxShadow: 'inset 2px 2px 4px rgba(139, 69, 19, 0.1)'
        }}
      />

      {defaultAmount === null ? (
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Amount (+ for income, - for expense)"
            value={chipAmount}
            onChange={(e) => setChipAmount(e.target.value)}
            className="w-full p-3 rounded border-2 text-sm"
            style={{
              backgroundColor: '#F9F7F4', 
              borderColor: '#8B4513', 
              color: '#2F1B14',
              fontFamily: "'Times New Roman', serif",
              boxShadow: 'inset 2px 2px 4px rgba(139, 69, 19, 0.1)'
            }}
          />
          <div className="text-xs mt-1 italic" style={{ color: '#8B4513' }}>
            Positive values = Income • Negative values = Expense
          </div>
        </div>
      ) : (
        <div 
          className="w-full p-3 rounded border-2 text-sm font-medium text-center"
          style={{
            backgroundColor: '#DDD5C7', 
            color: '#2F1B14',
            borderColor: '#8B4513',
            fontFamily: "'Times New Roman', serif"
          }}
        >
          Amount: ${defaultAmount >= 0 ? '+' : ''}${defaultAmount.toFixed(2)}
          <div className="text-xs mt-1 italic" style={{ color: '#8B4513' }}>
            {defaultAmount >= 0 ? 'Income' : 'Expense'}
          </div>
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        disabled={!chipTitle.trim() || (defaultAmount === null && (!chipAmount.trim() || isNaN(parseFloat(chipAmount))))}
        className="w-full py-3 rounded font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 border-2"
        style={{
          backgroundColor: '#8B4513',
          color: '#F9F7F4',
          borderColor: '#654321',
          fontFamily: "'Times New Roman', serif",
          boxShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
        }}
      >
        Create Entry
      </button>
    </div>
  );
}

export default ChipCreator;