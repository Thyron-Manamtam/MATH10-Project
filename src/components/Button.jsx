// Button Component
function Button({ onClick, className = "", children, style = {}, ...props }) {
  return (
    <button
      className={`h-16 text-xl font-medium rounded-md transition-all duration-150 active:scale-95 hover:shadow-md ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;