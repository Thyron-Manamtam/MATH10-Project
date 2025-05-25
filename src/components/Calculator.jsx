import { useState } from "react";
import Button from './Button';
import Display from './Display';
import ChipCreator from './ChipCreator';

export default function Calculator({ onCreateChip, availableChips = [] }) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [showChipPopup, setShowChipPopup] = useState(false);
  const [usedChips, setUsedChips] = useState([]); // Track chips used in calculation

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
      
      // Only show chip creation popup if chips were used in calculation
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
    
    // Track the chip used in calculation
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

  // Button style configurations
  const buttonStyles = {
    number: {
      backgroundColor: '#DDCBB7',
      color: 'black'
    },
    operator: {
      backgroundColor: '#A3AC8C',
      color: 'white'
    },
    equals: {
      backgroundColor: '#A3AC8C',
      color: 'white'
    }
  };

  return (
    <>
      <div 
        className="rounded-lg p-6 shadow-2xl w-full max-w-sm border" 
        style={{backgroundColor: '#997C70', borderColor: '#7B4B36'}}
      >
        <h2 className="text-white text-xl font-semibold mb-4 text-center">Budget Calculator</h2>
        
        <Display value={display} onDrop={handleDrop} onDragOver={handleDragOver} />

        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 - Function buttons */}
          <Button onClick={clear} style={buttonStyles.operator}>AC</Button>
          <Button onClick={handleToggleSign} style={buttonStyles.operator}>±</Button>
          <Button onClick={handlePercentage} style={buttonStyles.operator}>%</Button>
          <Button onClick={() => performOperation("÷")} style={buttonStyles.operator}>÷</Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber(7)} style={buttonStyles.number}>7</Button>
          <Button onClick={() => inputNumber(8)} style={buttonStyles.number}>8</Button>
          <Button onClick={() => inputNumber(9)} style={buttonStyles.number}>9</Button>
          <Button onClick={() => performOperation("×")} style={buttonStyles.operator}>×</Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber(4)} style={buttonStyles.number}>4</Button>
          <Button onClick={() => inputNumber(5)} style={buttonStyles.number}>5</Button>
          <Button onClick={() => inputNumber(6)} style={buttonStyles.number}>6</Button>
          <Button onClick={() => performOperation("-")} style={buttonStyles.operator}>−</Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber(1)} style={buttonStyles.number}>1</Button>
          <Button onClick={() => inputNumber(2)} style={buttonStyles.number}>2</Button>
          <Button onClick={() => inputNumber(3)} style={buttonStyles.number}>3</Button>
          <Button onClick={() => performOperation("+")} style={buttonStyles.operator}>+</Button>

          {/* Row 5 */}
          <Button 
            onClick={() => inputNumber(0)} 
            style={buttonStyles.number}
            className="col-span-2"
          >
            0
          </Button>
          <Button onClick={inputDecimal} style={buttonStyles.number}>.</Button>
          <Button 
            onClick={handleEquals} 
            style={buttonStyles.equals}
            className="text-2xl"
          >
            =
          </Button>
        </div>
      </div>

      {/* Chip Creation Popup - Only show if chips were used */}
      {showChipPopup && usedChips.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="rounded-lg p-6 w-full max-w-md mx-4 border"
            style={{backgroundColor: '#A96F59', borderColor: '#7B4B36'}}
          >
            <h3 className="text-white text-lg font-semibold mb-4 text-center">
              Result: ${parseFloat(display).toFixed(2)}
            </h3>

            {/* Update existing chip option */}
            <div 
              className="mb-4 p-4 rounded-lg border"
              style={{backgroundColor: '#DDCBB7', borderColor: '#82896E'}}
            >
              <h4 className="font-medium mb-3" style={{color: '#7B4B36'}}>
                Update Existing Chip:
              </h4>
              <div className="space-y-2">
                {usedChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => handleUpdateChip(chip)}
                    className="w-full p-2 rounded text-left hover:opacity-80 transition-opacity border"
                    style={{backgroundColor: 'white', color: '#7B4B36', borderColor: '#82896E'}}
                  >
                    <div className="flex justify-between">
                      <span>{chip.title}</span>
                      <span>${chip.amount.toFixed(2)} → ${parseFloat(display).toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Create new chip option */}
            <div 
              className="mb-4 p-4 rounded-lg border"
              style={{backgroundColor: '#DDCBB7', borderColor: '#82896E'}}
            >
              <h4 className="font-medium mb-3" style={{color: '#7B4B36'}}>
                Create New Chip:
              </h4>
              <ChipCreator onCreateChip={handleCreateChip} defaultAmount={parseFloat(display)} />
            </div>

            {/* Cancel button */}
            <button
              onClick={() => {
                setShowChipPopup(false);
                setUsedChips([]);
              }}
              className="w-full py-2 text-white hover:opacity-80 transition-opacity rounded"
              style={{backgroundColor: '#7B4B36'}}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}