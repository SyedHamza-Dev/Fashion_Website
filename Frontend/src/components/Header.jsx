import { FaSearch, FaBars, FaHeart, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const location = useLocation();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   urlParams.set("searchTerm", searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Function to close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="h-10 w-10"
              fill="none"
            >
              <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="4" />
              <path
                d="M35 30 H65 Q55 40 45 50 Q55 50 65 70 H45 Q35 55 35 30 Z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">
            Fit & Flair
          </h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links - Centered */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-8 md:text-gray-700 font-sans uppercase tracking-widest mx-auto`}
        >
          <Link to="/" className="no-underline" onClick={handleLinkClick}>
            <li className="hover:text-blue-600 font-bold text-black text-md">
              HOME
            </li>
          </Link>
          <Link to="/about" className="no-underline" onClick={handleLinkClick}>
            <li className="hover:text-blue-600 font-bold text-black text-md">
              ABOUT
            </li>
          </Link>
          <Link to="/blog" className="no-underline" onClick={handleLinkClick}>
            <li className="hover:text-blue-600 font-bold text-black text-md">
              BLOG
            </li>
          </Link>
          <Link to="/pages" className="no-underline" onClick={handleLinkClick}>
            <li className="hover:text-blue-600 font-bold text-black text-md">
              PAGES
            </li>
          </Link>
          <Link to="/contact" className="no-underline" onClick={handleLinkClick}>
            <li className="hover:text-blue-600 font-bold text-black text-md">
              CONTACT
            </li>
          </Link>
        </ul>

        {/* Right-side Icons or Avatar for Sign In */}
        <div className="hidden md:flex items-center space-x-6">
        {!currentUser ? (
            <Link to="/sign-in">
              {/* Custom Sign-In Button */}
              <button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition duration-300">
                Sign In
              </button>
            </Link>
          ) : (
            <>
              <Link to="/profile">
                {/* Display user's avatar if logged in */}
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Profile Avatar"
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 cursor-pointer"
                    onError={(e) => {
                      e.target.src = "default-avatar.png"; // Default avatar image in case of error
                    }}
                  />
                ) : (
                  <FaUserAlt className="h-8 w-8 text-gray-700 cursor-pointer hover:text-blue-600" />
                )}
              </Link>

              <FaSearch className="h-6 w-6 text-gray-700 cursor-pointer hover:text-blue-600" />
              <FaHeart className="h-6 w-6 text-gray-700 cursor-pointer hover:text-blue-600" />
              <div className="relative">
                <FaShoppingCart className="h-6 w-6 text-gray-700 cursor-pointer hover:text-blue-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  2
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
