export default function Display({ value, onDrop, onDragOver }) {
  return (
    <div 
      className="rounded-lg p-6 mb-4 border" 
      style={{backgroundColor: '#DDCBB7', borderColor: '#A3AC8C'}}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="text-right">
        <div 
          className="text-4xl font-light leading-none overflow-hidden" 
          style={{color: '#7B4B36'}}
        >
          {value.length > 9 ? parseFloat(value).toExponential(3) : value}
        </div>
      </div>
    </div>
  );
}