import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaWhatsapp, FaTwitter, FaFacebookSquare, FaInstagram, FaPinterest} from 'react-icons/fa';
import logo from '../assets/images/logo.png';
 const Footer = () => {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo + Store Name */}
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="FashionWeb"
            className="h-64 w-64 object-contain bg-transparent"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-12 mb-6">
          {['Company', 'Products', 'Offices', 'About', 'Contact'].map((item) => (
            <Link
              to={`/${item.toLowerCase()}`}
              key={item}
              className="text-gray-600 hover:text-black text-lg"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Social Media Icons with Colorful Effects */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <FaInstagram size={36} />
          </a>
          <a
            href="https://www.pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="text-red-500 hover:text-red-600"
          >
            <FaPinterest size={36} />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noreferrer"
            className="text-green-500 hover:text-green-600"
          >
            <FaWhatsapp size={36} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            <FaFacebookSquare size={36} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            <FaTwitter size={36} />
          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
