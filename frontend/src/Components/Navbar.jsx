import React, { useEffect, useRef, useState } from "react";
import { navItems } from "../data/Data";
import { gsap } from "gsap";
import { useWindowScroll } from "react-use";
import { GiHamburgerMenu } from "react-icons/gi";
import pates from '../assets/pates.png'
import { Link, NavLink } from 'react-router-dom';
import LoginPopup from "./LoginPopup";
import { RxAvatar } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../redux/authSlice";
const Navbar = () => {
  const dispatch=useDispatch()
  const token = useSelector((state) => state.auth.token); // adapte selon ton reducer
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAvOpen, setIsAvOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef(null);
  const [Type, setType] = useState('Signup')
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);
  const handleLogout = () => {
   dispatch(clearToken(token))
    console.log("Logout...");
  };
  const togglePopupType = (newType) => {
    setType(newType); // Change le type de popup (Login ou Signup)
  };
  return (
    <>
    {/* Navbar */}
    <div
      ref={navContainerRef}
      className="fixed top-0 z-[5000] w-full flex items-center justify-between gap-4 px-4 py-6 md:py-10  "
    >
      {/* Hamburger Button (Mobile only) */}
      <button
        id="menu-toggle"
        className="md:hidden absolute left-4"
        onClick={toggle}
      >
        <GiHamburgerMenu size={30} />
      </button>
  
      {/* Logo */}
      <a className="font-bold text-xl md:text-2xl mx-auto md:mx-0 flex justify-center items-center">
        <img src={pates} className="w-10 h-10 mr-2" alt="logo" />
        Noodz
      </a>
  
      <div
  id="menu"
  className={`flex-1 ${
    isOpen
      ? "flex flex-col bg-white absolute mx-auto min-w-screen rounded-2xl py-5 mt-50 left-0 items-center justify-center z-[5000] md:hidden"
      : "hidden md:flex flex-row justify-center items-center gap-10 z-[5000]"
  }`}
>

      {navItems.map((item, index) => (
        <NavLink
          to={item.link}
          key={index}
          className={({ isActive }) =>
            `text-sm md:text-lg lg:text-xl ${
              isActive
                ? "text-black underline decoration-orange-300 decoration-3 underline-offset-4"
                : "text-gray-600 hover:text-black"
            } transition-all duration-150`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
      <div className="flex items-center ml-auto">
        {token ? (
          <div className="relative">
            <button
              onClick={() => setIsAvOpen(!isAvOpen)}
              className="text-orange-300 font-bold flex items-center gap-2 px-5 py-2"
            >
              <RxAvatar size={30} />
            </button>
  
            {isAvOpen && (
              <div className="absolute right-0  w-48 bg-white border border-gray-200 rounded-xl shadow-xl">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-t-xl"
                  onClick={() => setIsAvOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/my"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100"
                  onClick={() => setIsAvOpen(false)}
                >
                  My Reservations
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsAvOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-b-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => {
                setType("Login");
                setShowLogin(true);
              }}
              className="text-orange-300 font-bold"
            >
              Login
            </button>
            <button
              onClick={() => {
                setType("Signup");
                setShowLogin(true);
              }}
              className="text-orange-300 font-bold border border-orange-300 rounded-full px-5 py-2"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  
    {/* Navigation Links */}
   
  
    <LoginPopup
      isOpen={showLogin}
      type={Type}
      onClose={() => setShowLogin(false)}
      toggleType={togglePopupType}
    />
  </>
  
  
  
  
  );
};

export default Navbar;
