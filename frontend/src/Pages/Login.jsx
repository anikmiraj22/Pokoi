import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../features/auth/authSlice';
import AuthLayout from '../components/Auth/AuthLayout';
import LoginForm from '../components/Auth/LoginForm';
import authService from '../appwrite/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setMessage('');
    
    try {
      await authService.login(credentials);
      const user = await authService.getCurrentUser();
      
      if (user) {
        dispatch(setUser(user));
        setMessage('✅ Login successful! Redirecting...');
        setMessageType('success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        throw new Error('Login failed: No user data received');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.message || 'Login failed. Please try again.';
      dispatch(setError(errorMsg));
      setMessage(`❌ ${errorMsg}`);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Prokoi"
      subtitle="Sign in to continue"
    >
      <div className="bg-white/90 dark:bg-gray-800 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <LoginForm
          onLogin={handleLogin}
          loading={isLoading}
          message={message}
          messageType={messageType}
        />

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Forgot your password?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-400 font-medium">
              Contact system administrator
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
