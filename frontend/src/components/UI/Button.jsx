const Button = ({ 
  type = 'button', 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary' 
}) => {
  const baseClasses = "w-full text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <>
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;