import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser , setError } from '../features/auth/authSlice';
import AuthLayout from '../components/Auth/AuthLayout';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Alert from '../components/UI/Alert';
import authService from '../appwrite/auth';
import { Link } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    if (formData.password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');
    
    try {
      // Create account using Appwrite
      await authService.createAccount({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      
      // Get the current user after successful registration
      const user = await authService.getCurrentUser();
      dispatch(setUser(user));
      
      setMessage('Account created successfully! Redirecting to dashboard...');
      setMessageType('success');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = error.message || 'Registration failed. Please try again.';
      dispatch(setError(errorMsg));
      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to get started"
    >
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <Alert message={message} type={messageType} />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required={true}
            icon="fas fa-user"
          />
          
          <Input
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required={true}
            icon="fas fa-envelope"
          />
          
          <Input
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (min. 8 characters)"
            required={true}
            icon="fas fa-lock"
          />
          
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required={true}
            icon="fas fa-lock"
          />
          
          <Button
            type="submit"
            loading={isLoading}
            variant="primary"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Create Account
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;