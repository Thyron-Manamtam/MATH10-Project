import { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import ChipCreator from "./ChipCreator";

// Calculator Component
function Calculator({ onCreateChip, availableChips = [] }) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [showChipPopup, setShowChipPopup] = useState(false);
  const [usedChips, setUsedChips] = useState([]);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setShowChipPopup(false);
    setUsedChips([]);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      
      if (usedChips.length > 0) {
        setShowChipPopup(true);
      }
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const chipData = JSON.parse(e.dataTransfer.getData("text/plain"));
    setDisplay(String(chipData.amount));
    setWaitingForNewValue(true);
    
    setUsedChips(prev => {
      const exists = prev.find(chip => chip.id === chipData.id);
      if (!exists) {
        return [...prev, chipData];
      }
      return prev;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCreateChip = (chipData) => {
    onCreateChip({
      ...chipData,
      amount: parseFloat(display)
    });
    setShowChipPopup(false);
    setUsedChips([]);
  };

  const handleUpdateChip = (chipToUpdate) => {
    onCreateChip({
      ...chipToUpdate,
      amount: parseFloat(display),
      isUpdate: true
    });
    setShowChipPopup(false);
    setUsedChips([]);
  };

  const buttonStyles = {
    number: {
      backgroundColor: '#F9F7F4',
      color: '#2F1B14',
      borderColor: '#8B4513',
      fontFamily: "'Times New Roman', serif"
    },
    operator: {
      backgroundColor: '#8B4513',
      color: '#F9F7F4',
      borderColor: '#654321',
      fontFamily: "'Times New Roman', serif"
    },
    equals: {
      backgroundColor: '#654321',
      color: '#F9F7F4',
      borderColor: '#2F1B14',
      fontFamily: "'Times New Roman', serif"
    }
  };

  return (
    <>
      <div 
        className="rounded-lg p-6 shadow-2xl w-full max-w-sm border-4 relative" 
        style={{
          backgroundColor: '#F2EDE6', 
          borderColor: '#8B4513',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D2B48C' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Vintage letterhead */}
        <div className="text-center mb-6 border-b-2 pb-4" style={{ borderColor: '#8B4513' }}>
          <h2 className="text-xl font-bold mb-1" style={{ 
            color: '#2F1B14',
            fontFamily: "'Times New Roman', serif",
            textShadow: '1px 1px 2px rgba(139, 69, 19, 0.3)'
          }}>
            Financial Calculator
          </h2>
          <div className="text-xs italic" style={{ color: '#8B4513' }}>
            Est. 1850 • Precision & Elegance
          </div>
        </div>
        
        <Display value={display} onDrop={handleDrop} onDragOver={handleDragOver} />

        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} style={{...buttonStyles.operator, border: '2px solid #654321'}}>AC</Button>
          <Button onClick={handleToggleSign} style={{...buttonStyles.operator, border: '2px solid #654321'}}>±</Button>
          <Button onClick={handlePercentage} style={{...buttonStyles.operator, border: '2px solid #654321'}}>%</Button>
          <Button onClick={() => performOperation("÷")} style={{...buttonStyles.operator, border: '2px solid #654321'}}>÷</Button>

          <Button onClick={() => inputNumber(7)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>7</Button>
          <Button onClick={() => inputNumber(8)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>8</Button>
          <Button onClick={() => inputNumber(9)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>9</Button>
          <Button onClick={() => performOperation("×")} style={{...buttonStyles.operator, border: '2px solid #654321'}}>×</Button>

          <Button onClick={() => inputNumber(4)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>4</Button>
          <Button onClick={() => inputNumber(5)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>5</Button>
          <Button onClick={() => inputNumber(6)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>6</Button>
          <Button onClick={() => performOperation("-")} style={{...buttonStyles.operator, border: '2px solid #654321'}}>−</Button>

          <Button onClick={() => inputNumber(1)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>1</Button>
          <Button onClick={() => inputNumber(2)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>2</Button>
          <Button onClick={() => inputNumber(3)} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>3</Button>
          <Button onClick={() => performOperation("+")} style={{...buttonStyles.operator, border: '2px solid #654321'}}>+</Button>

          <Button 
            onClick={() => inputNumber(0)} 
            style={{...buttonStyles.number, border: '2px solid #8B4513'}}
            className="col-span-2"
          >
            0
          </Button>
          <Button onClick={inputDecimal} style={{...buttonStyles.number, border: '2px solid #8B4513'}}>.</Button>
          <Button 
            onClick={handleEquals} 
            style={{...buttonStyles.equals, border: '2px solid #2F1B14'}}
            className="text-2xl"
          >
            =
          </Button>
        </div>
      </div>

      {showChipPopup && usedChips.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="rounded-lg p-6 w-full max-w-md mx-4 border-4 relative"
            style={{
              backgroundColor: '#F2EDE6', 
              borderColor: '#8B4513',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D2B48C' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            <div className="text-center border-b-2 pb-3 mb-4" style={{ borderColor: '#8B4513' }}>
              <h3 className="text-lg font-bold" style={{ 
                color: '#2F1B14',
                fontFamily: "'Times New Roman', serif"
              }}>
                Calculation Result
              </h3>
              <div className="text-2xl font-bold mt-2" style={{ color: '#654321' }}>
                ${parseFloat(display).toFixed(2)}
              </div>
            </div>

            <div 
              className="mb-4 p-4 rounded-lg border-2"
              style={{backgroundColor: '#F9F7F4', borderColor: '#8B4513'}}
            >
              <h4 className="font-bold mb-3 italic" style={{color: '#2F1B14'}}>
                Update Existing Entry:
              </h4>
              <div className="space-y-2">
                {usedChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => handleUpdateChip(chip)}
                    className="w-full p-3 rounded text-left hover:opacity-80 transition-opacity border-2"
                    style={{
                      backgroundColor: '#F9F7F4', 
                      color: '#2F1B14', 
                      borderColor: '#8B4513',
                      fontFamily: "'Times New Roman', serif"
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="italic">{chip.title}</span>
                      <span>${chip.amount.toFixed(2)} → ${parseFloat(display).toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div 
              className="mb-4 p-4 rounded-lg border-2"
              style={{backgroundColor: '#F9F7F4', borderColor: '#8B4513'}}
            >
              <h4 className="font-bold mb-3 italic" style={{color: '#2F1B14'}}>
                Create New Entry:
              </h4>
              <ChipCreator onCreateChip={handleCreateChip} defaultAmount={parseFloat(display)} />
            </div>

            <button
              onClick={() => {
                setShowChipPopup(false);
                setUsedChips([]);
              }}
              className="w-full py-3 hover:opacity-80 transition-opacity rounded border-2 font-bold"
              style={{
                backgroundColor: '#2F1B14',
                color: '#F9F7F4',
                borderColor: '#8B4513',
                fontFamily: "'Times New Roman', serif"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Calculator;