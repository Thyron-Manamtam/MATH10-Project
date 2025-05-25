export default function DraggableChip({ chip, onRemove, className = "" }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(chip));
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className={`flex justify-between items-center p-2 rounded text-xs cursor-move hover:opacity-80 transition-opacity ${className}`}
      style={{backgroundColor: '#DDCBB7', color: '#7B4B36'}}
    >
      <span className="font-medium">{chip.title}</span>
      <div className="flex items-center gap-2">
        <span>${chip.amount.toFixed(2)}</span>
        {onRemove && (
          <button
            onClick={() => onRemove(chip.id)}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}