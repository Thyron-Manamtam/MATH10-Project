import { useState } from "react";
import Calculator from './components/Calculator';
import BudgetNotes from './components/BudgetNotes';
import BudgetStorage from './components/BudgetStorage';

export default function App() {
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [dayBudgetChips, setDayBudgetChips] = useState([]);
  const [storageChips, setStorageChips] = useState([]);

  const handleSubmitBudget = (budgetData) => {
    // Check if an entry with the same date already exists
    const existingEntryIndex = budgetEntries.findIndex(entry => entry.date === budgetData.date);
    
    if (existingEntryIndex !== -1) {
      // Update existing entry
      const updatedEntries = [...budgetEntries];
      updatedEntries[existingEntryIndex] = {
        ...budgetData,
        id: updatedEntries[existingEntryIndex].id // Keep the original ID
      };
      setBudgetEntries(updatedEntries);
    } else {
      // Add new entry
      setBudgetEntries([...budgetEntries, budgetData]);
    }
  };

  const handleDeleteEntry = (entryId) => {
    setBudgetEntries(budgetEntries.filter(entry => entry.id !== entryId));
  };

  const handleCreateChip = (chipData) => {
    if (chipData.isUpdate) {
      // Update existing chip
      if (chipData.type === "daybudget") {
        setDayBudgetChips(prev => 
          prev.map(chip => 
            chip.id === chipData.id 
              ? { ...chip, amount: chipData.amount }
              : chip
          )
        );
      } else if (chipData.type === "storage") {
        setStorageChips(prev => 
          prev.map(chip => 
            chip.id === chipData.id 
              ? { ...chip, amount: chipData.amount }
              : chip
          )
        );
      }
    } else {
      // Create new chip
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

  // Get all available chips for dragging
  const allChips = [
    ...dayBudgetChips.map(chip => ({ ...chip, type: "daybudget" })),
    ...storageChips.map(chip => ({ ...chip, type: "storage" }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center p-6">
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