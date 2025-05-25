export default function DraggableChip({ chip, onRemove, className = "" }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(chip));
    
    // Create a cute square drag image
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `
      <div style="
        width: 80px; 
        height: 80px; 
        background: linear-gradient(135deg, #DDCBB7 0%, #A3AC8C 100%);
        border: 3px solid #7B4B36;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: #7B4B36;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        transform: rotate(-3deg);
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <div style="font-size: 8px; margin-bottom: 2px; text-align: center; line-height: 1.1;">
          ${chip.title.length > 8 ? chip.title.substring(0, 8) + '...' : chip.title}
        </div>
        <div style="font-size: 10px; font-weight: bold;">
          $${chip.amount.toFixed(2)}
        </div>
        <div style="position: absolute; top: -5px; right: -5px; width: 16px; height: 16px; background: #A3AC8C; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; color: white;">
          💰
        </div>
      </div>
    `;
    
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 40, 40);
    
    // Clean up the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const categoryIndicator = chip.category === "expense" ? "−" : "+";
  const categoryColor = chip.category === "expense" ? "#dc2626" : "#16a34a";

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className={`flex justify-between items-center p-2 rounded text-xs cursor-move hover:opacity-80 transition-opacity ${className}`}
      style={{backgroundColor: '#DDCBB7', color: '#7B4B36'}}
    >
      <div className="flex items-center gap-2">
        {chip.category && (
          <span 
            className="font-bold text-sm"
            style={{color: categoryColor}}
          >
            {categoryIndicator}
          </span>
        )}
        <span className="font-medium">{chip.title}</span>
      </div>
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