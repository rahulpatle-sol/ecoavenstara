import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Ecoavenstra1_logo.png";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const profileRole = localStorage.getItem("profile_Role");

  const [isLogin, setIsLogin] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(!!token);
    setIsEmployer(profileRole === "EMPLOYER");
  }, [token, profileRole]);

  const handleLoginClick = () => navigate("/login");

  const handleLogoutClick = () => {
    navigate("/login");
    setIsLogin(false);
    localStorage.clear();
  };

  const handleEmployeeClick = () => {
    setEmployee((prev) => {
      const next = !prev;
      navigate(next ? "/employerform" : "/");
      return next;
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex items-center justify-between px-6 py-4 bg-black backdrop-blur-md shadow-md"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2"
      >
        <Link to="/">
          <img src={Logo} alt="Ecoavenstra Logo" className="h-10 w-auto" />
        </Link>
      </motion.div>

      {/* Center Nav Links */}
      <ul className="hidden md:flex flex-wrap justify-center gap-6 text-xl p-4 font-medium text-white">
        {["Home", "About", "Services", "Articles", "Jobs", "Contact Us"].map((label) => (
          <motion.li
            key={label}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group"
          >
            <Link
              to={`/${label.toLowerCase().replace(" ", "-")}`}
              className="transition-colors duration-300"
            >
              {label}
            </Link>
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </motion.li>
        ))}
        {isEmployer && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleEmployeeClick}
            className="bg-[#1c3987] py-1 px-3 rounded-lg text-white font-semibold"
          >
            {employee ? "Go to Home" : "Employer Form"}
          </motion.button>
        )}
      </ul>

      {/* Right Login / Avatar */}
      <div className="flex items-center">
        {isLogin ? (
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-full cursor-pointer border border-white/20"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="User"
            />
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-700 rounded-lg shadow w-44"
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{localStorage.getItem("profile_Name")}</div>
                    <div className="font-medium truncate">{localStorage.getItem("profile_Email")}</div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogoutClick}
                      className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={handleLoginClick}
            className="text-zinc-400 hover:text-green-600 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-1 px-6 shadow hover:shadow-green-600 duration-700"
          >
            Log In
          </motion.button>
        )}
      </div>
      
    </motion.nav>
  );
};

export default Navbar;
