import { useState } from "react";
import Calculator from './components/Calculator';
import BudgetNotes from './components/BudgetNotes';
import BudgetStorage from './components/BudgetStorage';

export default function App() {
  const [budgetEntries, setBudgetEntries] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center p-6">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl">
        <Calculator />
        <BudgetNotes onSubmitBudget={handleSubmitBudget} />
        <BudgetStorage 
          budgetEntries={budgetEntries} 
          onDeleteEntry={handleDeleteEntry} 
        />
      </div>
    </div>
  );
}