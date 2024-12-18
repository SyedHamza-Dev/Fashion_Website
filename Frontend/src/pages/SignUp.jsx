import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

// Password strength checker function
const checkPasswordStrength = (password) => {
  let strength = 0;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[\W]/.test(password);

  if (password.length >= 8) strength += 1; // Length check
  if (hasUppercase) strength += 1;
  if (hasNumber) strength += 1;
  if (hasSpecialChar) strength += 1;

  return {
    strength,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
  };
};

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, hasUppercase: false, hasNumber: false, hasSpecialChar: false });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordStrength.hasUppercase || !passwordStrength.hasNumber || !passwordStrength.hasSpecialChar) {
      setError('Password must include at least one uppercase letter, one number, and one special character.');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setSuccess(data.message);
      setLoading(false);
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };
  
  const getPasswordStrengthLabel = () => {
    switch (passwordStrength.strength) {
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Too weak';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-12">
  <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
    {/* Left Side - Image */}
    <div className="hidden md:block w-1/2">
      <img
        src="https://i.pinimg.com/736x/57/3f/ee/573feed57b0bfa146af85db6d1179bcc.jpg"
        alt="Side"
        className="object-cover h-full w-full"
      />
    </div>

    {/* Right Side - Form */}
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            required
          />

          {/* Password Strength Meter */}
          {showPasswordRequirements && (
            <div className="mt-3">
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength.strength === 1
                      ? 'bg-red-500 w-1/4'
                      : passwordStrength.strength === 2
                      ? 'bg-yellow-500 w-1/2'
                      : passwordStrength.strength === 3
                      ? 'bg-green-500 w-3/4'
                      : passwordStrength.strength === 4
                      ? 'bg-green-600 w-full'
                      : 'w-0'
                  }`}
                />
              </div>
              <div className="text-sm mt-2">
                Password Strength:{' '}
                <span
                  className={`font-semibold ${
                    passwordStrength.strength >= 3 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {getPasswordStrengthLabel()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>

        {/* OAuth Component */}
        <OAuth />
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/sign-in">
            <span className="text-blue-600 font-semibold">Sign In</span>
          </Link>
        </p>
      </div>

      {/* Error & Success Messages */}
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {success && <p className="text-green-500 mt-5">{success}</p>}
    </div>
  </div>
</div>



  );
}
