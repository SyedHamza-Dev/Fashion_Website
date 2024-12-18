
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import logo from '../assets/images/googlelogo.png'

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log('Sign In API Response:', data); // Log the response

        // Check if the API response has a success flag and user data
        if (data.success === false) {
            dispatch(signInFailure(data.message));
            return;
        }

        // Assuming the successful response directly gives user details
        if (data) {
            dispatch(signInSuccess(data));
            localStorage.setItem('user', JSON.stringify(data)); // Store the entire user object
            localStorage.setItem('userEmail', data.email); // Store the user's email
            navigate('/'); // Redirect to home page after sign-in
        } else {
            dispatch(signInFailure("User email not found. Please sign in again."));
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        dispatch(signInFailure(error.message)); // Handle error in Redux
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Container */}
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://i.pinimg.com/736x/85/41/a7/8541a73c6ce630009d79772961dba455.jpg" // Example placeholder image
            alt="Side"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Login
          </h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-gray-600 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-gray-600 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg uppercase font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

         
             <OAuth />
     

          {/* Sign-Up Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>

  );
}
