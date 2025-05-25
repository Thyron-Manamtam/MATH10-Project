import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

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

  const Button = ({ onClick, className, children, ...props }) => (
    <button
      className={`h-16 text-xl font-medium rounded-full transition-all duration-150 active:scale-95 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-black rounded-3xl p-6 shadow-2xl max-w-sm w-full">
        {/* Display */}
        <div className="bg-black rounded-2xl p-6 mb-4">
          <div className="text-right">
            <div className="text-white text-4xl font-light leading-none overflow-hidden">
              {display.length > 9 ? parseFloat(display).toExponential(3) : display}
            </div>
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="bg-gray-500 text-black hover:bg-gray-400 active:bg-gray-600"
          >
            AC
          </Button>
          <Button
            onClick={handleToggleSign}
            className="bg-gray-500 text-black hover:bg-gray-400 active:bg-gray-600"
          >
            ±
          </Button>
          <Button
            onClick={handlePercentage}
            className="bg-gray-500 text-black hover:bg-gray-400 active:bg-gray-600"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation("÷")}
            className={`text-white text-2xl ${
              operation === "÷"
                ? "bg-white text-orange-500"
                : "bg-orange-500 hover:bg-orange-400 active:bg-orange-600"
            }`}
          >
            ÷
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber(7)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber(8)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber(9)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation("×")}
            className={`text-white text-2xl ${
              operation === "×"
                ? "bg-white text-orange-500"
                : "bg-orange-500 hover:bg-orange-400 active:bg-orange-600"
            }`}
          >
            ×
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber(4)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber(5)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber(6)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation("-")}
            className={`text-white text-2xl ${
              operation === "-"
                ? "bg-white text-orange-500"
                : "bg-orange-500 hover:bg-orange-400 active:bg-orange-600"
            }`}
          >
            −
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber(1)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber(2)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber(3)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation("+")}
            className={`text-white text-2xl ${
              operation === "+"
                ? "bg-white text-orange-500"
                : "bg-orange-500 hover:bg-orange-400 active:bg-orange-600"
            }`}
          >
            +
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber(0)}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800 col-span-2"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800"
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600 text-2xl"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}