export default function DraggableChip({ chip, onRemove, className = "" }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(chip));
    
    // Create a mail-like drag image
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `
      <div style="
        width: 140px; 
        height: 80px; 
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border: 2px solid #A3AC8C;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        font-size: 11px;
        font-weight: 500;
        color: #7B4B36;
        box-shadow: 0 8px 16px rgba(123, 75, 54, 0.15);
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        position: relative;
        overflow: hidden;
      ">
        <!-- Mail-like header bar -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(135deg, #A3AC8C 0%, #82896E 100%);
          display: flex;
          align-items: center;
          padding: 0 8px;
        ">
          <div style="
            width: 6px;
            height: 6px;
            background: ${chip.category === 'expense' ? '#5F6550' : '#B16A5C'};
            border-radius: 50%;
            margin-right: 4px;
          "></div>
          <div style="
            font-size: 8px;
            color: white;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          ">
            ${chip.category === 'expense' ? 'EXPENSE' : 'INCOME'}
          </div>
        </div>
        
        <!-- Content area -->
        <div style="
          margin-top: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        ">
          <!-- Title -->
          <div style="
            font-size: 10px; 
            font-weight: 700;
            margin-bottom: 6px; 
            text-align: left; 
            line-height: 1.2;
            color: #7B4B36;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          ">
            ${chip.title.length > 16 ? chip.title.substring(0, 16) + '...' : chip.title}
          </div>
          
          <!-- Amount -->
          <div style="
            font-size: 16px; 
            font-weight: 800; 
            color: ${chip.category === 'expense' ? '#5F6550' : '#B16A5C'};
            text-align: left;
            line-height: 1;
          ">
            ${chip.category === 'expense' ? '-' : '+'}$${chip.amount.toFixed(2)}
          </div>
        </div>
        
        <!-- Bottom accent line -->
        <div style="
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: ${chip.category === 'expense' ? '#5F6550' : '#B16A5C'};
        "></div>
      </div>
    `;
    
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.left = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 70, 40);
    
    // Clean up the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const categoryColor = chip.category === "expense" ? "#5F6550" : "#B16A5C";

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className={`relative rounded-lg cursor-move hover:shadow-lg transition-all transform hover:scale-[0.98] border overflow-hidden ${className}`}
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#A3AC8C',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        minHeight: '70px'
      }}
    >
      {/* Mail-like header bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-5 flex items-center px-2"
        style={{ 
          background: 'linear-gradient(135deg, #A3AC8C 0%, #82896E 100%)' 
        }}
      >
        <div 
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: categoryColor }}
        />
        <div 
          className="text-xs font-semibold text-white uppercase tracking-wide"
          style={{ fontSize: '8px' }}
        >
          {chip.category === "expense" ? "EXPENSE" : "INCOME"}
        </div>
      </div>
      
      {/* Content area */}
      <div className="pt-6 p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pr-4">
            <div 
              className="font-bold text-sm leading-tight"
              style={{ color: '#7B4B36' }}
            >
              {chip.title}
            </div>
          </div>
        </div>
        
        {/* Amount section */}
        <div className="flex justify-between items-center">
          <div 
            className="text-xl font-bold"
            style={{ color: categoryColor }}
          >
            {chip.category === "expense" ? "-" : "+"}${chip.amount.toFixed(2)}
          </div>
          
          {onRemove && (
            <button
              onClick={() => onRemove(chip.id)}
              className="w-6 h-6 rounded flex items-center justify-center hover:opacity-80 transition-opacity text-sm font-bold ml-2"
              style={{
                backgroundColor: '#997C70',
                color: 'white'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: categoryColor }}
      />
    </div>
  );
}