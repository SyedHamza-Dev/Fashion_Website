import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/googlelogo.png';


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
    onClick={handleGoogleClick}
    className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 py-3 rounded-lg shadow-md hover:shadow-lg hover:border-gray-400 transition-transform transform hover:-translate-y-0.5 duration-200"
  >
    <img
      src={logo}
      alt="Google Logo"
      className="w-6 h-6"
    />
    <span className="text-sm font-semibold">Continue with Google</span>
  </button>
  
  );
}
