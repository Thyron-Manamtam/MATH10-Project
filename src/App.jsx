import { useState } from "react";
import Calculator from "./components/Calculator";
import BudgetNotes from "./components/BudgetNotes";
import BudgetStorage from "./components/BudgetStorage";

export default function App() {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [dayBudgetChips, setDayBudgetChips] = useState([]);
  const [storageChips, setStorageChips] = useState([]);

  const handleSubmitBudget = (budgetData) => {
    const existingEntryIndex = budgetEntries.findIndex(entry => entry.date === budgetData.date);
    
    if (existingEntryIndex !== -1) {
      const updatedEntries = [...budgetEntries];
      const existingEntry = updatedEntries[existingEntryIndex];
      const combinedChips = [...existingEntry.chips, ...budgetData.chips];
      const newTotal = combinedChips.reduce((sum, chip) => {
        return chip.category === "expense" 
          ? sum - chip.amount 
          : sum + chip.amount;
      }, 0);
      
      updatedEntries[existingEntryIndex] = {
        ...existingEntry,
        chips: combinedChips,
        total: newTotal
      };
      setBudgetEntries(updatedEntries);
    } else {
      setBudgetEntries([...budgetEntries, budgetData]);
    }
  };

  const handleDeleteEntry = (entryId) => {
    setBudgetEntries(budgetEntries.filter(entry => entry.id !== entryId));
  };

  const handleCreateChip = (chipData) => {
    if (chipData.isUpdate) {
      if (chipData.type === "daybudget") {
        setDayBudgetChips(prev => 
          prev.map(chip => 
            chip.id === chipData.id 
              ? { ...chip, amount: chipData.amount }
              : chip
          )
        );
        
        setBudgetEntries(prev => 
          prev.map(entry => ({
            ...entry,
            chips: entry.chips.map(chip => 
              chip.id === chipData.id 
                ? { ...chip, amount: chipData.amount }
                : chip
            ),
            total: entry.chips.map(chip => 
              chip.id === chipData.id 
                ? { ...chip, amount: chipData.amount }
                : chip
            ).reduce((sum, chip) => {
              return chip.category === "expense" 
                ? sum - chip.amount 
                : sum + chip.amount;
            }, 0)
          }))
        );
        
      } else if (chipData.type === "storage") {
        setStorageChips(prev => 
          prev.map(chip => 
            chip.id === chipData.id 
              ? { ...chip, amount: chipData.amount }
              : chip
          )
        );
        
        setBudgetEntries(prev => 
          prev.map(entry => ({
            ...entry,
            chips: entry.chips.map(chip => 
              chip.id === chipData.id 
                ? { ...chip, amount: chipData.amount }
                : chip
            ),
            total: entry.chips.map(chip => 
              chip.id === chipData.id 
                ? { ...chip, amount: chipData.amount }
                : chip
            ).reduce((sum, chip) => {
              return chip.category === "expense" 
                ? sum - chip.amount 
                : sum + chip.amount;
            }, 0)
          }))
        );
      }
    } else {
      const newChip = {
        ...chipData,
        id: Date.now()
      };
      
      if (chipData.type === "daybudget") {
        setDayBudgetChips(prev => [...prev, newChip]);
      } else if (chipData.type === "storage") {
        setStorageChips(prev => [...prev, newChip]);
      }
    }
  };

  const handleRemoveChip = (chipId, chipType) => {
    if (chipType === "daybudget") {
      setDayBudgetChips(prev => prev.filter(chip => chip.id !== chipId));
    } else if (chipType === "storage") {
      setStorageChips(prev => prev.filter(chip => chip.id !== chipId));
    }
  };

  const allChips = [
    ...dayBudgetChips.map(chip => ({ ...chip, type: "daybudget" })),
    ...storageChips.map(chip => ({ ...chip, type: "storage" })),
    ...budgetEntries.flatMap(entry => 
      entry.chips.map(chip => ({ ...chip, type: "storage" }))
    )
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ 
        backgroundColor: '#F5F0E8',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D2B48C' fill-opacity='0.03'%3E%3Cpath d='M50 50c0 11-4.5 20-10 20s-10-9-10-20 4.5-20 10-20 10 9 10 20zm0-40c0 11-4.5 20-10 20s-10-9-10-20 4.5-20 10-20 10 9 10 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        fontFamily: "'Times New Roman', 'Crimson Text', serif" 
      }}
    >
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl">
        <Calculator 
          onCreateChip={handleCreateChip}
          availableChips={allChips}
        />
        <BudgetNotes 
          onSubmitBudget={handleSubmitBudget}
          dayBudgetChips={dayBudgetChips}
          onAddChip={handleCreateChip}
          onRemoveChip={handleRemoveChip}
        />
        <BudgetStorage 
          budgetEntries={budgetEntries} 
          onDeleteEntry={handleDeleteEntry}
          storageChips={storageChips}
          onAddChip={handleCreateChip}
          onRemoveChip={handleRemoveChip}
        />
      </div>
    </div>
  );
}