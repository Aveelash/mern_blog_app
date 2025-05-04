import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import avatarImg from "../assets/commentor (1).png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const navLists = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-md transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/logo (3).png"
            alt="Logo"
            className="h-10 sm:h-12 object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center space-x-10 text-[17px] font-semibold">
          {navLists.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-300 ease-in-out"
                    : "text-gray-700 hover:text-blue-600 transition-all duration-300 ease-in-out"
                }
              >
                {name}
              </NavLink>
            </li>
          ))}

          {/* Auth Buttons */}
          {user && user.role === "user" && (
            <li className="flex items-center gap-3">
              <img src={avatarImg} alt="" className="size-8" />
              <button
                onClick={handleLogout}
                className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
              >
                Logout
              </button>
            </li>
          )}

          {user && user.role === "admin" && (
            <li className="flex items-center gap-3">
              <img src={avatarImg} alt="" className="size-8" />
              <Link to="/dashboard">
                <button className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm">
                  Dashboard
                </button>
              </Link>
            </li>
          )}

          {!user && (
            <li>
              <Link
                to="/login"
                className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm hover:bg-[#155a96] transition-all duration-300"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none transition-all duration-300"
          >
            {isMenuOpen ? (
              <IoClose className="w-7 h-7" />
            ) : (
              <IoMenuSharp className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white/90 backdrop-blur-md mx-4 mt-2 px-6 py-5 rounded-2xl shadow-2xl animate-fade-slide-down space-y-4 border border-gray-200 transition-all duration-300 ease-in-out">
          {navLists.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-3 rounded-md text-blue-600 font-semibold bg-blue-100 transition-all duration-300"
                  : "block px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300"
              }
            >
              {name}
            </NavLink>
          ))}

          {/* Mobile Auth Buttons */}
          {user && user.role === "user" && (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="block w-full text-center px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 font-semibold transition-all duration-300 text-white"
            >
              Logout
            </button>
          )}

          {user && user.role === "admin" && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="block w-full text-center px-5 py-3 rounded-full bg-[#1E73BE] hover:bg-[#155a96] font-semibold transition-all duration-300 text-white"
            >
              Dashboard
            </Link>
          )}

          {!user && (
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "block w-full text-center px-5 py-3 rounded-full bg-blue-700 font-semibold transform scale-105 transition-all duration-300 text-white"
                  : "block w-full text-center px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold hover:scale-105 transform transition-all duration-300 text-white"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
