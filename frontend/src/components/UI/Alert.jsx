const Alert = ({ message, type = 'error', onClose }) => {
  if (!message) return null;
  
  const styles = {
    error: "bg-red-50 text-red-700 border-red-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    info: "bg-blue-50 text-blue-700 border-blue-200"
  };
  
  const icons = {
    error: "fa-exclamation-circle",
    success: "fa-check-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle"
  };
  
  return (
    <div className={`p-4 mb-4 rounded-lg border ${styles[type]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <i className={`fas ${icons[type]} mr-2`}></i>
          <span>{message}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;