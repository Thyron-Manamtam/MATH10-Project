import DraggableChip from './DraggableChip';

export default function BudgetStorage({ budgetEntries, onDeleteEntry, storageChips = [], onAddChip, onRemoveChip }) {
  const totalAllBudgets = budgetEntries.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <div
      className="rounded-lg p-6 shadow-2xl w-full max-w-lg border flex flex-col"
      style={{
        backgroundColor: '#997C70',
        borderColor: '#7B4B36',
        height: '600px',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-semibold">
          Budget Storage
        </h2>
        <div 
          className="px-3 py-1 rounded text-sm font-medium"
          style={{ 
            backgroundColor: '#DDCBB7', 
            color: '#7B4B36' 
          }}
        >
          {budgetEntries.length} entries
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Budget Entries Section */}
        {budgetEntries.length === 0 ? (
          <div 
            className="text-center p-8 rounded flex-1 flex flex-col justify-center border-2 border-dashed"
            style={{ 
              backgroundColor: '#DDCBB7', 
              color: '#7B4B36', 
              borderColor: '#5F6550' 
            }}
          >
            <div className="text-4xl mb-4">💰</div>
            <p className="text-lg font-medium">No budget entries yet</p>
            <p className="text-sm opacity-75 mt-2">
              Submit your first day budget to see it here
            </p>
          </div>
        ) : (
          <>
            {/* Total Summary */}
            <div 
              className="p-4 rounded text-center border"
              style={{
                backgroundColor: totalAllBudgets >= 0 ? '#5F6550' : '#B16A5C',
                color: 'white',
                borderColor: totalAllBudgets >= 0 ? '#82896E' : '#991b1b'
              }}
            >
              <div className="text-sm font-medium mb-1">
                Total All Budgets
              </div>
              <div className="text-2xl font-bold">
                ${totalAllBudgets.toFixed(2)}
              </div>
            </div>

            {/* Budget Entries */}
            <div className="space-y-4">
              {budgetEntries.map((entry) => (
                <div 
                  key={entry.id}
                  className="p-4 rounded border"
                  style={{
                    backgroundColor: '#DDCBB7',
                    borderColor: '#5F6550'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 
                        className="text-lg font-bold"
                        style={{ color: '#7B4B36' }}
                      >
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </h3>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: '#7B4B36' }}
                      >
                        {entry.chips.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-xl font-bold mb-2"
                        style={{ 
                          color: entry.total >= 0 ? '#16a34a' : '#B16A5C' 
                        }}
                      >
                        ${entry.total.toFixed(2)}
                      </div>
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="px-3 py-1 text-sm font-medium rounded hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: '#997C70',
                          color: 'white'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Chips Display */}
                  <div className="space-y-2">
                    <h5 
                      className="text-xs font-semibold uppercase tracking-wide mb-2"
                      style={{ color: '#7B4B36' }}
                    >
                      Items (Drag to Calculator):
                    </h5>
                    <div className="space-y-2">
                      {entry.chips.map((chip) => (
                        <DraggableChip 
                          key={chip.id}
                          chip={chip}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}