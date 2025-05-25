import { useState } from "react";
import Calculator from './components/Calculator';
import BudgetNotes from './components/BudgetNotes';
import BudgetStorage from './components/BudgetStorage';

export default function App() {
  const [budgetEntries, setBudgetEntries] = useState([]);

  const handleSubmitBudget = (budgetData) => {
    setBudgetEntries([...budgetEntries, budgetData]);
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