const Input = ({ 
  type = 'text', 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  icon,
  name
}) => {
  return (
    <div>
      <label className="block text-gray-300 font-medium mb-2" htmlFor={name || label}>
        {icon && <i className={`${icon} text-blue-400 mr-2`}></i>}
        {label}
      </label>
      <input 
        type={type}
        id={name || label}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none 
                 transition-all duration-200 placeholder-gray-400"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;