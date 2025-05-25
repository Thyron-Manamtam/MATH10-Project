import DraggableChip from './DraggableChip';

export default function BudgetStorage({ budgetEntries, onDeleteEntry, onAddChipToStorage }) {
  const totalAllBudgets = budgetEntries.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <div
      className="rounded-lg p-6 shadow-2xl w-full max-w-lg border flex flex-col"
      style={{backgroundColor: '#A96F59', borderColor: '#7B4B36', height: '600px'}}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Budget Storage</h2>
        <div className="text-white text-sm">
          {budgetEntries.length} entries
        </div>
      </div>

      {budgetEntries.length === 0 ? (
        <div 
          className="text-center p-8 rounded-lg flex-1 flex flex-col justify-center"
          style={{backgroundColor: '#DDCBB7', color: '#7B4B36'}}
        >
          <p className="text-lg">No budget entries yet</p>
          <p className="text-sm opacity-75 mt-2">
            Submit your first day budget to see it here
          </p>
        </div>
      ) : (
        <>
          {/* Total Summary */}
          <div 
            className="mb-4 p-4 rounded-lg text-center"
            style={{backgroundColor: '#A3AC8C'}}
          >
            <div className="text-white text-sm">Total All Budgets</div>
            <div className="text-white text-2xl font-bold">
              ${totalAllBudgets.toFixed(2)}
            </div>
          </div>

          {/* Budget Entries - Scrollable */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {budgetEntries.map((entry) => (
              <div 
                key={entry.id}
                className="p-4 rounded-lg border"
                style={{backgroundColor: '#DDCBB7', borderColor: '#82896E'}}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold" style={{color: '#7B4B36'}}>
                      {new Date(entry.date).toLocaleDateString()}
                    </h3>
                    <p className="text-sm" style={{color: '#7B4B36'}}>
                      {entry.chips.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <div 
                      className="text-lg font-bold"
                      style={{color: '#7B4B36'}}
                    >
                      ${entry.total.toFixed(2)}
                    </div>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Chips Display */}
                <div className="space-y-1">
                  <h5 className="text-xs font-medium mb-1" style={{color: '#7B4B36'}}>
                    Items (Drag to Calculator):
                  </h5>
                  {entry.chips.map((chip) => (
                    <DraggableChip 
                      key={chip.id}
                      chip={chip}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}