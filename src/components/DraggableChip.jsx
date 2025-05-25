// DraggableChip Component
function DraggableChip({ chip, onRemove, className = "" }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(chip));
    
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `
      <div style="
        width: 160px; 
        height: 90px; 
        background: linear-gradient(135deg, #F9F7F4 0%, #F2EDE6 100%);
        border: 2px solid #8B4513;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        padding: 12px;
        font-size: 12px;
        font-weight: 500;
        color: #2F1B14;
        box-shadow: 0 8px 16px rgba(47, 27, 20, 0.2);
        font-family: 'Times New Roman', serif;
        position: relative;
        overflow: hidden;
      ">
        <!-- Vintage header with wax seal effect -->
        <div style="
          position: absolute;
          top: -5px;
          right: 15px;
          width: 25px;
          height: 25px;
          background: radial-gradient(circle, #8B4513 0%, #654321 100%);
          border-radius: 50%;
          border: 3px solid #2F1B14;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: ${chip.category === 'expense' ? '#A0522D' : '#CD853F'};
            border-radius: 50%;
          "></div>
        </div>
        
        <!-- Letter content -->
        <div style="margin-top: 10px;">
          <div style="
            font-size: 11px; 
            font-weight: bold;
            margin-bottom: 8px; 
            text-align: left; 
            line-height: 1.3;
            color: #2F1B14;
            font-style: italic;
          ">
            ${chip.title.length > 18 ? chip.title.substring(0, 18) + '...' : chip.title}
          </div>
          
          <div style="
            font-size: 18px; 
            font-weight: bold; 
            color: ${chip.category === 'expense' ? '#8B0000' : '#006400'};
            text-align: left;
            font-family: 'Times New Roman', serif;
          ">
            ${chip.category === 'expense' ? '-' : '+'}$${chip.amount.toFixed(2)}
          </div>
        </div>
        
        <!-- Vintage paper lines -->
        <div style="
          position: absolute;
          bottom: 15px;
          left: 12px;
          right: 12px;
          height: 1px;
          background: linear-gradient(to right, transparent, #8B4513, transparent);
        "></div>
      </div>
    `;
    
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 80, 45);
    
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const categoryColor = chip.category === "expense" ? "#8B0000" : "#006400";

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className={`relative rounded-lg cursor-move hover:shadow-lg transition-all transform hover:scale-[0.98] border-2 overflow-hidden ${className}`}
      style={{
        backgroundColor: '#F9F7F4',
        borderColor: '#8B4513',
        fontFamily: "'Times New Roman', serif",
        minHeight: '80px',
        backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.05) 50%, rgba(139, 69, 19, 0.05) 51%, transparent 52%)',
        backgroundSize: '10px 10px'
      }}
    >
      {/* Wax seal in corner */}
      <div 
        className="absolute top-2 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center"
        style={{ 
          background: 'radial-gradient(circle, #8B4513 0%, #654321 100%)',
          borderColor: '#2F1B14'
        }}
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: categoryColor }}
        />
      </div>
      
      {/* Content area */}
      <div className="pt-4 p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-6">
            <div 
              className="font-bold text-sm leading-tight italic"
              style={{ color: '#2F1B14' }}
            >
              {chip.title}
            </div>
            <div 
              className="text-xs mt-1 uppercase tracking-wider"
              style={{ color: '#8B4513' }}
            >
              {chip.category === "expense" ? "Expenditure" : "Receipt"}
            </div>
          </div>
        </div>
        
        {/* Amount section */}
        <div className="flex justify-between items-center">
          <div 
            className="text-xl font-bold"
            style={{ 
              color: categoryColor,
              fontFamily: "'Times New Roman', serif"
            }}
          >
            {chip.category === "expense" ? "-" : "+"}${chip.amount.toFixed(2)}
          </div>
          
          {onRemove && (
            <button
              onClick={() => onRemove(chip.id)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity text-sm font-bold ml-2 border-2"
              style={{
                backgroundColor: '#2F1B14',
                color: '#F9F7F4',
                borderColor: '#8B4513'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Vintage paper line at bottom */}
      <div 
        className="absolute bottom-2 left-4 right-4 h-px"
        style={{ 
          background: 'linear-gradient(to right, transparent, #8B4513, transparent)' 
        }}
      />
    </div>
  );
}

export default DraggableChip;