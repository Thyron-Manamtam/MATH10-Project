// Display Component
function Display({ value, onDrop, onDragOver }) {
  return (
    <div 
      className="rounded-lg p-6 mb-4 border-2 border-dashed relative" 
      style={{
        backgroundColor: '#F9F7F4',
        borderColor: '#8B4513',
        backgroundImage: 'linear-gradient(45deg, transparent 24%, rgba(139, 69, 19, 0.1) 25%, rgba(139, 69, 19, 0.1) 26%, transparent 27%, transparent 74%, rgba(139, 69, 19, 0.1) 75%, rgba(139, 69, 19, 0.1) 76%, transparent 77%)',
        backgroundSize: '20px 20px'
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {/* Vintage paper texture overlay */}
      <div className="absolute inset-0 rounded-lg opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="text-right relative z-10">
        <div 
          className="text-4xl font-light leading-none overflow-hidden" 
          style={{
            color: '#2F1B14',
            fontFamily: "'Times New Roman', 'Crimson Text', serif",
            textShadow: '1px 1px 2px rgba(139, 69, 19, 0.2)'
          }}
        >
          {value.length > 9 ? parseFloat(value).toExponential(3) : value}
        </div>
      </div>
    </div>
  );
}

export default Display;