// src/pages/EmailVerification.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailVerification() {
  const [formData, setFormData] = useState({ email: '', code: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        setSuccess('Verification code resent successfully!');
      }
      setLoading(false);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        setSuccess(data.message);
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
  <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">Email Verification</h1>
  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Verification code"
        className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        name="code"
        value={formData.code}
        onChange={handleChange}
        required
      />
    </div>
    <div>
      <button
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg transition duration-200 hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </button>
    </div>
  </form>
  <div className="mt-6 text-center">
    <button
      onClick={handleResendCode}
      disabled={loading}
      className="text-blue-600 text-lg font-medium underline hover:text-blue-700"
    >
      Resend Verification Code
    </button>
  </div>
  {error && <p className="mt-6 text-red-600 text-center text-lg">{error}</p>}
  {success && <p className="mt-6 text-green-600 text-center text-lg">{success}</p>}
</div>

  );
}
