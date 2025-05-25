import React, { useState, useMemo } from "react";
import DraggableChip from "./DraggableChip";
import ChipCreator from "./ChipCreator";

// BudgetStorage Component
function BudgetStorage({ budgetEntries = [], onDeleteEntry, storageChips = [], onAddChip, onRemoveChip }) {
  const [showChipForm, setShowChipForm] = useState(false);
  const [sortBy, setSortBy] = useState("all"); // "all", "day", "month"
  const [selectedDate, setSelectedDate] = useState("");

  const addChip = (chipData) => {
    const newChip = {
      ...chipData,
      id: Date.now(),
      type: "storage"
    };
    onAddChip(newChip);
    setShowChipForm(false);
  };

  const removeChip = (chipId) => {
    onRemoveChip(chipId, "storage");
  };

  const storageTotal = storageChips.reduce((sum, chip) => {
    return chip.category === "expense" 
      ? sum - chip.amount 
      : sum + chip.amount;
  }, 0);

  // Sorting and filtering logic
  const sortedAndFilteredEntries = useMemo(() => {
    let filtered = [...budgetEntries];

    if (sortBy === "day" && selectedDate) {
      filtered = filtered.filter(entry => entry.date === selectedDate);
    } else if (sortBy === "month" && selectedDate) {
      const selectedMonth = selectedDate.substring(0, 7); // YYYY-MM format
      filtered = filtered.filter(entry => entry.date.substring(0, 7) === selectedMonth);
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [budgetEntries, sortBy, selectedDate]);

  // Get available dates for filtering
  const availableDates = useMemo(() => {
    return [...new Set(budgetEntries.map(entry => entry.date))].sort().reverse();
  }, [budgetEntries]);

  // Get available months for filtering
  const availableMonths = useMemo(() => {
    const months = [...new Set(budgetEntries.map(entry => entry.date.substring(0, 7)))];
    return months.sort().reverse();
  }, [budgetEntries]);

  const grandTotal = budgetEntries.reduce((total, entry) => total + entry.total, 0) + storageTotal;
  const filteredTotal = sortedAndFilteredEntries.reduce((total, entry) => total + entry.total, 0);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setSelectedDate("");
  };

  const resetFilters = () => {
    setSortBy("all");
    setSelectedDate("");
  };

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
          Financial Archives
        </h2>
        <div className="text-xs italic" style={{ color: '#8B4513' }}>
          Historical Budget Records
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Grand Total Display */}
        <div 
          className="p-4 rounded-lg text-center font-bold border-2 relative"
          style={{
            backgroundColor: grandTotal >= 0 ? '#654321' : '#8B0000',
            color: '#F9F7F4',
            borderColor: grandTotal >= 0 ? '#2F1B14' : '#660000',
            fontFamily: "'Times New Roman', serif",
            boxShadow: '2px 2px 6px rgba(47, 27, 20, 0.4)'
          }}
        >
          {/* Decorative corner elements */}
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: '#F9F7F4' }} />
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: '#F9F7F4' }} />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: '#F9F7F4' }} />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: '#F9F7F4' }} />
          
          <div className="text-sm opacity-80 mb-1">Total Estate Value</div>
          <div className="text-2xl">£{grandTotal.toFixed(2)}</div>
        </div>

        {/* Sorting Controls */}
        <div 
          className="p-3 rounded border-2 space-y-3"
          style={{ 
            backgroundColor: '#F9F7F4', 
            borderColor: '#8B4513',
            backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.03) 50%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)',
            backgroundSize: '8px 8px'
          }}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold italic" style={{ color: '#2F1B14' }}>
              Sort Records:
            </h4>
            {(sortBy !== "all" || selectedDate) && (
              <button
                onClick={resetFilters}
                className="text-xs px-2 py-1 rounded hover:opacity-80 transition-opacity border"
                style={{
                  backgroundColor: '#8B4513',
                  color: '#F9F7F4',
                  borderColor: '#654321'
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Sort Type Buttons */}
          <div className="flex gap-1">
            {["all", "day", "month"].map((type) => (
              <button
                key={type}
                onClick={() => handleSortChange(type)}
                className={`flex-1 py-1 px-2 rounded text-xs font-medium border transition-opacity hover:opacity-80 ${
                  sortBy === type ? 'font-bold' : ''
                }`}
                style={{
                  backgroundColor: sortBy === type ? '#654321' : '#8B4513',
                  color: '#F9F7F4',
                  borderColor: sortBy === type ? '#2F1B14' : '#654321',
                  opacity: sortBy === type ? 1 : 0.8
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Date/Month Selector */}
          {sortBy === "day" && availableDates.length > 0 && (
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 rounded border-2 text-xs"
              style={{
                backgroundColor: '#F9F7F4',
                borderColor: '#8B4513',
                color: '#2F1B14',
                fontFamily: "'Times New Roman', serif"
              }}
            >
              <option value="">Select a day...</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-GB')}
                </option>
              ))}
            </select>
          )}

          {sortBy === "month" && availableMonths.length > 0 && (
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 rounded border-2 text-xs"
              style={{
                backgroundColor: '#F9F7F4',
                borderColor: '#8B4513',
                color: '#2F1B14',
                fontFamily: "'Times New Roman', serif"
              }}
            >
              <option value="">Select a month...</option>
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {new Date(month + '-01').toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </option>
              ))}
            </select>
          )}

          {/* Filtered Total Display */}
          {sortBy !== "all" && selectedDate && (
            <div 
              className="p-2 rounded text-center font-bold text-xs border-2"
              style={{
                backgroundColor: filteredTotal >= 0 ? '#006400' : '#8B0000',
                color: '#F9F7F4',
                borderColor: filteredTotal >= 0 ? '#228B22' : '#660000',
                fontFamily: "'Times New Roman', serif"
              }}
            >
              Filtered Total: £{filteredTotal.toFixed(2)}
            </div>
          )}
        </div>

        {/* Budget Entries History */}
        <div>
          <h4 className="text-sm font-bold mb-3 italic flex justify-between items-center" style={{ color: '#2F1B14' }}>
            <span>Daily Records (Individual Entries Draggable):</span>
            <span className="text-xs font-normal opacity-75">
              {sortedAndFilteredEntries.length} / {budgetEntries.length} records
            </span>
          </h4>
          
          {sortedAndFilteredEntries.length === 0 ? (
            <div 
              className="text-center py-8 rounded border-2 border-dashed"
              style={{ 
                color: '#8B4513', 
                borderColor: '#8B4513',
                backgroundColor: 'rgba(139, 69, 19, 0.05)'
              }}
            >
              <div className="text-4xl mb-2 opacity-50">📜</div>
              <div className="text-sm italic">
                {budgetEntries.length === 0 ? "No records yet" : "No records match your filter"}
              </div>
              <div className="text-xs mt-1">
                {budgetEntries.length === 0 
                  ? "Create entries to build your financial history"
                  : "Try adjusting your filter settings"
                }
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {sortedAndFilteredEntries.map((entry) => (
                <div 
                  key={entry.id}
                  className="rounded-lg border-2 p-4 relative"
                  style={{
                    backgroundColor: '#F9F7F4',
                    borderColor: '#8B4513',
                    backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.03) 50%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)',
                    backgroundSize: '8px 8px'
                  }}
                >
                  {/* Entry Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div 
                        className="font-bold text-sm"
                        style={{ color: '#2F1B14', fontFamily: "'Times New Roman', serif" }}
                      >
                        {new Date(entry.date).toLocaleDateString('en-GB')}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: '#8B4513' }}
                      >
                        {entry.chips.length} entries
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="font-bold"
                        style={{ 
                          color: entry.total >= 0 ? '#006400' : '#8B0000',
                          fontFamily: "'Times New Roman', serif"
                        }}
                      >
                        £{entry.total.toFixed(2)}
                      </div>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity font-bold text-xs border-2"
                        style={{
                          backgroundColor: '#8B0000',
                          color: '#F9F7F4',
                          borderColor: '#660000'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Individual Entry Chips - These are draggable */}
                  <div className="space-y-2">
                    {entry.chips.map((chip) => (
                      <DraggableChip 
                        key={chip.id}
                        chip={{...chip, type: "entry"}}
                        className="transform scale-95"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetStorage;