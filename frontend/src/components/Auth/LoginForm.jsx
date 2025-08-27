import { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Alert from '../UI/Alert';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, loading = false, message, messageType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert message={message} type={messageType} />

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
          Welcome 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your dashboard
        </p>
      </div>

      {/* Email */}
      <Input
        type="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required={true}
        icon="fas fa-envelope"
      />

      {/* Password */}
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required={true}
        icon="fas fa-lock"
      />

      {/* Login Button */}
      <Button
        type="submit"
        loading={loading}
        variant="primary"
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        <i className="fas fa-sign-in-alt mr-2"></i>
        Sign In
      </Button>

      {/* Registration Section */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Don’t have an account?
        </p>
        <Link 
          to="/register" 
          className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <i className="fas fa-user-plus mr-2"></i>
          Create Account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
