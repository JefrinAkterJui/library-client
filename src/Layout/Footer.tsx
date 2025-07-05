import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#30303f] text-white ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">About This Project</h3>
            <p className="text-gray-400 text-sm">
              This is a digital library management system created for an academic assignment. It demonstrates key features of a modern web application, built using React, TypeScript, and Tailwind CSS.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/books" className="text-gray-400 hover:text-white transition-colors duration-300">All Books</NavLink>
              </li>
              <li>
                <NavLink to="/create-book" className="text-gray-400 hover:text-white transition-colors duration-300">Add Book</NavLink>
              </li>
              <li>
                <NavLink to="/borrow-summary" className="text-gray-400 hover:text-white transition-colors duration-300">Borrow Summary</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/jefrinakterjui" target="_blank" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={22} />
              </a>
              <a href="https://x.com/Jui_Dev" target="_blank" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={22} />
              </a>
              <a href="https://github.com/JefrinAkterJui" target="_blank" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaGithub size={22} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Jui. All Rights Reserved.</p>
          <p className="mt-1">Built for Academic Purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
