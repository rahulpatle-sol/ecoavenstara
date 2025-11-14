import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Ecoavenstra1_logo.png";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const profileRole = localStorage.getItem("profile_Role");

  const [isLogin, setIsLogin] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const navItems = {
    Home: [],
    About: [
      { label: "Who We Are", link: "/about#who-we-are" },
      { label: "Our Journey", link: "/about#story" },
      { label: "Our Vision & Mission", link: "/about#vision" },
    ],
    Services: [
      { label: "HR & Staffing", link: "/services#hr" },
      { label: "IT Services", link: "/services#it" },
      { label: "Consulting", link: "/services#consulting" },
    ],
    Articles: [
      { label: "Latest News", link: "/articles#news" },
      { label: "Blogs", link: "/articles#blogs" },
      { label: "Case Studies", link: "/articles#case-studies" },
    ],
    Jobs: [
      { label: "Open Positions", link: "/jobs#openings" },
      { label: "Apply Now", link: "/jobs#apply" },
    ],
    "Contact Us": [],
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md shadow-md fixed top-0 left-0 z-50"
      >
        {/* LOGO */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
          <Link to="/">
            <img src={Logo} alt="Ecoavenstra Logo" className="h-10 w-auto" />
          </Link>
        </motion.div>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-white">
          {Object.keys(navItems).map((label) => (
            <motion.li
              key={label}
              className="relative group cursor-pointer"
              onMouseEnter={() => setMegaMenu(label)}
              onMouseLeave={() => setMegaMenu("")}
            >
              <Link to={`/${label.toLowerCase().replace(/ /g, "-")}`}>{label}</Link>

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>

              {/* Mega Dropdown */}
              <AnimatePresence>
                {megaMenu === label && navItems[label].length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-3 left-0 bg-white text-black shadow-xl p-5 rounded-xl min-w-[240px]"
                  >
                    {navItems[label].map((item) => (
                      <Link
                        key={item.label}
                        to={item.link}
                        className="block py-2 px-2 rounded-md hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}

          {/* EMPLOYER BUTTON */}
          {isEmployer && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleEmployeeClick}
              className="bg-[#1c3987] py-1 px-3 rounded-lg text-white font-semibold"
            >
              {employee ? "Go to Home" : "Employer Form"}
            </motion.button>
          )}
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* LOGIN / PROFILE */}
          {isLogin ? (
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                className="w-10 h-10 rounded-full cursor-pointer border border-white/20"
              />

              {/* Profile Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 z-50 bg-white rounded-lg shadow w-44"
                  >
                    <div className="px-4 py-3 text-sm text-gray-800">
                      <div>{localStorage.getItem("profile_Name")}</div>
                      <div className="font-medium truncate">
                        {localStorage.getItem("profile_Email")}
                      </div>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                    >
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLoginClick}
              className="text-zinc-300 hover:text-green-600 border border-white/20 px-5 py-1 rounded-md"
            >
              Log In
            </motion.button>
          )}

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            {!mobileOpen ? (
              <HiMenu
                onClick={() => setMobileOpen(true)}
                className="text-white text-3xl cursor-pointer"
              />
            ) : (
              <HiX
                onClick={() => setMobileOpen(false)}
                className="text-white text-3xl cursor-pointer"
              />
            )}
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 h-full w-72 bg-black text-white p-6 z-50 shadow-xl md:hidden"
          >
            <h2 className="text-xl font-bold mb-6">Menu</h2>

            {Object.keys(navItems).map((label) => (
              <div key={label} className="mb-4">
                <Link
                  to={`/${label.toLowerCase().replace(/ /g, "-")}`}
                  className="text-lg font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>

                {/* Mobile Submenu */}
                {navItems[label].length > 0 && (
                  <div className="pl-4 mt-2 text-gray-300 space-y-2">
                    {navItems[label].map((item) => (
                      <Link
                        key={item.label}
                        to={item.link}
                        className="block"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
