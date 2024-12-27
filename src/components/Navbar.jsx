import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Navbar */}
            <nav className="flex  items-center justify-between bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-4 shadow-lg">
                <div className="logo">
                    <span className="font-extrabold text-2xl mx-8 tracking-wide">iTask</span>
                </div>
                <ul className="hidden md:flex gap-8 mx-9 text-lg">
                    <li className="cursor-pointer hover:text-indigo-300 transition-colors duration-200">Home</li>
                    <li className="cursor-pointer hover:text-indigo-300 transition-colors duration-200">Your Tasks</li>
                </ul>
                
                {/* Mobile menu icon */}
                <button onClick={toggleMenu} className="md:hidden text-white hover:text-indigo-300 transition-colors duration-200">
                    <FiMenu size={28} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-indigo-800 to-purple-800 p-6 shadow-lg transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out md:hidden z-50`}
            >
                <button onClick={toggleMenu} className="text-white hover:text-indigo-300 transition-colors duration-200 mb-8">
                    <FaTimes size={24} />
                </button>
                <ul className="flex flex-col gap-6 mt-8 text-white text-lg">
                    <li className="cursor-pointer hover:text-indigo-300 transition-colors duration-200">Home</li>
                    <li className="cursor-pointer hover:text-indigo-300 transition-colors duration-200">Your Tasks</li>
                </ul>
            </div>

            {/* Overlay background when menu is open */}
            {isOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                ></div>
            )}
        </>
    );
};

export default Navbar;
