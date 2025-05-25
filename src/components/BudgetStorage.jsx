import React, { useState } from "react";
import DraggableChip from "./DraggableChip";
import ChipCreator from "./ChipCreator";

// BudgetStorage Component
function BudgetStorage({ budgetEntries = [], onDeleteEntry, storageChips = [], onAddChip, onRemoveChip }) {
  const [showChipForm, setShowChipForm] = useState(false);

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

  const grandTotal = budgetEntries.reduce((total, entry) => total + entry.total, 0) + storageTotal;

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

        {/* Storage Chips Section */}
        <div>
          {showChipForm && (
            <div 
              className="p-4 rounded border-2 mb-3 relative"
              style={{ 
                backgroundColor: '#F9F7F4', 
                borderColor: '#8B4513',
                backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.03) 50%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)',
                backgroundSize: '8px 8px'
              }}
            >
              {/* Wax seal decoration */}
              <div 
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, #8B4513 0%, #654321 100%)',
                  borderColor: '#2F1B14'
                }}
              >
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#F9F7F4' }} />
              </div>

              <div className="flex justify-between items-center mb-3">
                <h3 
                  className="font-bold italic text-sm"
                  style={{ color: '#2F1B14', fontFamily: "'Times New Roman', serif" }}
                >
                  Quick Entry
                </h3>
                <button
                  onClick={() => setShowChipForm(false)}
                  className="w-5 h-5 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity font-bold text-xs border-2"
                  style={{
                    backgroundColor: '#2F1B14',
                    color: '#F9F7F4',
                    borderColor: '#8B4513'
                  }}
                >
                  ×
                </button>
              </div>
              
              <ChipCreator onCreateChip={addChip} />
            </div>
          )}

          {storageChips.length > 0 && (
            <div className="space-y-2 max-h-32 overflow-y-auto mb-4">
              {storageChips.map((chip) => (
                <DraggableChip 
                  key={chip.id}
                  chip={chip}
                  onRemove={removeChip}
                  className="transform scale-90"
                />
              ))}
            </div>
          )}

          {storageChips.length > 0 && (
            <div 
              className="p-2 rounded text-center font-bold text-sm border-2"
              style={{
                backgroundColor: storageTotal >= 0 ? '#8B4513' : '#8B0000',
                color: '#F9F7F4',
                borderColor: storageTotal >= 0 ? '#654321' : '#660000',
                fontFamily: "'Times New Roman', serif"
              }}
            >
              Quick Total: £{storageTotal.toFixed(2)}
            </div>
          )}
        </div>

        {/* Budget Entries History */}
        <div>
          <h4 className="text-sm font-bold mb-3 italic" style={{ color: '#2F1B14' }}>
            Daily Records:
          </h4>
          
          {budgetEntries.length === 0 ? (
            <div 
              className="text-center py-8 rounded border-2 border-dashed"
              style={{ 
                color: '#8B4513', 
                borderColor: '#8B4513',
                backgroundColor: 'rgba(139, 69, 19, 0.05)'
              }}
            >
              <div className="text-4xl mb-2 opacity-50">📜</div>
              <div className="text-sm italic">No records yet</div>
              <div className="text-xs mt-1">Create entries to build your financial history</div>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {budgetEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg p-4 border-2 relative"
                  style={{
                    backgroundColor: '#F9F7F4',
                    borderColor: '#8B4513',
                    backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.03) 50%, rgba(139, 69, 19, 0.03) 51%, transparent 52%)',
                    backgroundSize: '12px 12px'
                  }}
                >
                  {/* Wax seal with date */}
                  <div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      background: entry.total >= 0 
                        ? 'radial-gradient(circle, #654321 0%, #8B4513 100%)'
                        : 'radial-gradient(circle, #8B0000 0%, #660000 100%)',
                      borderColor: '#2F1B14',
                      color: '#F9F7F4'
                    }}
                  >
                    {new Date(entry.date).getDate()}
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div 
                        className="font-bold text-sm"
                        style={{ color: '#2F1B14', fontFamily: "'Times New Roman', serif" }}
                      >
                        {new Date(entry.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#8B4513' }}>
                        {entry.chips.length} entries recorded
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity text-xs font-bold border-2"
                      style={{
                        backgroundColor: '#8B0000',
                        color: '#F9F7F4',
                        borderColor: '#660000'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    {entry.chips.slice(0, 2).map((chip, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span style={{ color: '#2F1B14' }} className="italic">
                          {chip.title.length > 20 ? chip.title.substring(0, 20) + '...' : chip.title}
                        </span>
                        <span style={{ 
                          color: chip.category === "expense" ? "#8B0000" : "#006400",
                          fontWeight: 'bold'
                        }}>
                          {chip.category === "expense" ? "-" : "+"}£{chip.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                    {entry.chips.length > 2 && (
                      <div className="text-xs italic" style={{ color: '#8B4513' }}>
                        ... and {entry.chips.length - 2} more entries
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="mt-3 pt-2 border-t-2 text-center font-bold"
                    style={{ 
                      borderColor: '#8B4513',
                      color: entry.total >= 0 ? '#006400' : '#8B0000',
                      fontFamily: "'Times New Roman', serif"
                    }}
                  >
                    Daily Balance: £{entry.total.toFixed(2)}
                  </div>
                  
                  {/* Vintage paper line at bottom */}
                  <div 
                    className="absolute bottom-2 left-4 right-4 h-px"
                    style={{ 
                      background: 'linear-gradient(to right, transparent, #8B4513, transparent)' 
                    }}
                  />
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