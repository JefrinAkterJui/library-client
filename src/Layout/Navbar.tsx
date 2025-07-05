import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return `relative py-2 text-md font-normal transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500 after:transition-transform after:duration-300 after:ease-in-out after:transform ${
      isActive
        ? 'text-[#6D605D] after:scale-x-100'
        : 'text-[#6D605D] after:scale-x-0 hover:after:scale-x-100'
    }`;
  };

  return (
    <nav className="container m-auto font-aclonica p-4 w-full">
      <div className=" mx-auto flex justify-between items-center">
        <div className="w-32">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/books" className={getNavLinkClass}>
            All Books
          </NavLink>
          <NavLink to="/create-book" className={getNavLinkClass}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={getNavLinkClass}>
            Borrow Summary
          </NavLink>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#6D605D]focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          <NavLink to="/books" className={getNavLinkClass} onClick={toggleMenu}>
            All Books
          </NavLink>
          <NavLink to="/create-book" className={getNavLinkClass} onClick={toggleMenu}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={getNavLinkClass} onClick={toggleMenu}>
            Borrow Summary
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;