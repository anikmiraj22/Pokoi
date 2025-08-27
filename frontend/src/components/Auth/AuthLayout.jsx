const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-900 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 font-sans shadow-xl rounded-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-900 text-white text-center py-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-indigo-100">{subtitle}</p>
        </div>

        {/* Content */}
        <div className="px-8 py-6">{children}</div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Prokoi
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
