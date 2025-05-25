import { useState, useEffect } from "react";

export default function ChipCreator({ onCreateChip, defaultAmount = null }) {
  const [chipTitle, setChipTitle] = useState("");
  const [chipDate, setChipDate] = useState("");
  const [chipType, setChipType] = useState("daybudget"); // daybudget or storage
  const [chipAmount, setChipAmount] = useState(defaultAmount ? String(defaultAmount) : "");

  // Update chipAmount when defaultAmount changes
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
        amount: finalAmount
      });
      setChipTitle("");
      setChipDate("");
      if (defaultAmount === null) {
        setChipAmount("");
      }
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Chip title"
        value={chipTitle}
        onChange={(e) => setChipTitle(e.target.value)}
        className="w-full p-2 rounded border text-sm"
        style={{backgroundColor: 'white', borderColor: '#82896E', color: '#7B4B36'}}
      />

      {/* Show amount input only if defaultAmount is not provided */}
      {defaultAmount === null && (
        <input
          type="number"
          step="0.01"
          placeholder="Amount ($)"
          value={chipAmount}
          onChange={(e) => setChipAmount(e.target.value)}
          className="w-full p-2 rounded border text-sm"
          style={{backgroundColor: 'white', borderColor: '#82896E', color: '#7B4B36'}}
        />
      )}

      {/* Show amount display if defaultAmount is provided */}
      {defaultAmount !== null && (
        <div 
          className="w-full p-2 rounded border text-sm font-medium text-center"
          style={{backgroundColor: '#A3AC8C', color: 'white'}}
        >
          Amount: ${defaultAmount.toFixed(2)}
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        disabled={!chipTitle.trim() || (defaultAmount === null && (!chipAmount.trim() || isNaN(parseFloat(chipAmount))))}
        className="w-full py-2 rounded text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{backgroundColor: '#A3AC8C'}}
      >
        Create Chip
      </button>
    </div>
  );
}