import { useState } from "react";

export default function ChipCreator({ onCreateChip }) {
  const [chipTitle, setChipTitle] = useState("");
  const [chipDate, setChipDate] = useState("");
  const [chipType, setChipType] = useState("daybudget"); // daybudget or storage

  const handleSubmit = () => {
    if (chipTitle.trim()) {
      onCreateChip({
        title: chipTitle.trim(),
        date: chipType === "storage" ? chipDate : null,
        type: chipType
      });
      setChipTitle("");
      setChipDate("");
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
      
      <div className="flex gap-2">
        <select
          value={chipType}
          onChange={(e) => setChipType(e.target.value)}
          className="flex-1 p-2 rounded border text-sm"
          style={{backgroundColor: 'white', borderColor: '#82896E', color: '#7B4B36'}}
        >
          <option value="daybudget">Day Budget</option>
          <option value="storage">Budget Storage</option>
        </select>
        
        {chipType === "storage" && (
          <input
            type="date"
            value={chipDate}
            onChange={(e) => setChipDate(e.target.value)}
            className="flex-1 p-2 rounded border text-sm"
            style={{backgroundColor: 'white', borderColor: '#82896E', color: '#7B4B36'}}
          />
        )}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!chipTitle.trim() || (chipType === "storage" && !chipDate)}
        className="w-full py-2 rounded text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{backgroundColor: '#A3AC8C'}}
      >
        Create Chip
      </button>
    </div>
  );
}