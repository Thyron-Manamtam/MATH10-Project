import Calculator from './pages/Calculator.jsx';
import BudgetNotes from './pages/BudgetNotes.jsx';

export default function BudgetCalculatorApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row gap-20 w-full">
          <Calculator />
          <BudgetNotes />
      </div>
    </div>
  );
}
