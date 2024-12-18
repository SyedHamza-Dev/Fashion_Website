import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
  {/* Header with Gradient */}
  <div className='bg-gradient-to-r from-purple-500 to-indigo-500 h-36 flex flex-col items-center justify-center relative'>
    <div className='w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center'>
   
    <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
    </div>
    <h1 className='text-white text-lg font-semibold mt-2'>{currentUser.username}</h1>
  </div>

  <form onSubmit={handleSubmit} className='p-6 space-y-4'>
    {/* Input Field with Icons */}
    <div className='relative flex items-center border rounded-md px-3 py-2'>
      <span className='text-gray-500'>👤</span>
      <input
        type='text'
        placeholder='Username'
        defaultValue={currentUser.username}
        id='username'
        className='w-full ml-3 focus:outline-none'
        onChange={handleChange}
      />
    </div>

    <div className='relative flex items-center border rounded-md px-3 py-2'>
      <span className='text-gray-500'>📧</span>
      <input
        type='email'
        placeholder='Email'
        id='email'
        defaultValue={currentUser.email}
        className='w-full ml-3 focus:outline-none'
        onChange={handleChange}
      />
    </div>

    <div className='relative flex items-center border rounded-md px-3 py-2'>
      <span className='text-gray-500'>🔒</span>
      <input
        type='password'
        placeholder='Password'
        id='password'
        className='w-full ml-3 focus:outline-none'
        onChange={handleChange}
      />
    </div>

    {/* Update Profile Button */}
    <button
      disabled={loading}
      className='w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-full font-semibold hover:opacity-90 disabled:bg-gray-300'
    >
      {loading ? 'Loading...' : 'Update Profile'}
    </button>
  </form>

  <p className='text-red-700 mt-5'>{error ? error : ''}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess ? 'User is updated successfully!' : ''}
        </p>

  {/* Delete Account and Sign Out Buttons */}
  <div className='flex justify-between px-6 pb-6'>
    <button
      onClick={handleDeleteUser}
      className='text-sm text-red-500 hover:underline'
    >
      Delete Account
    </button>
    <button
      onClick={handleSignOut}
      className='text-sm text-red-500 hover:underline'
    >
      Sign Out
    </button>
  </div>
</div>

  
  );
}
