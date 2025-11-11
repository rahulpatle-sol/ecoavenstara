import React, { useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLogin } from "./Redux/LoginSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PulseLoader } from "react-spinners"; // Import a loader component

const ToggleSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userToEmployer, setUserToEmployer] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const dispatch = useDispatch();
  const Email = useRef(null);
  const Password = useRef(null);
  const Name = useRef(null);
  const OTP = useRef(null);
  const NewPassword = useRef(null);
  const ConfirmPassword = useRef(null);
  const navigate = useNavigate();

  const toggleToEmployer = () => {
    setUserToEmployer((prev) => !prev);
    resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const handleForgotPassword = async () => {
    const email = Email.current.value;

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://ecoavenstra-be.onrender.com/api/v1/user/forgot-password",
        { mail: email }
      );

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP!");
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async () => {
    const email = Email.current.value;
    const otp = OTP.current.value;

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://ecoavenstra-be.onrender.com/api/v1/user/verify-otp",
        { mail: email, otp: parseInt(otp) }
      );

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
      }
    } catch (error) {
      toast.error("Invalid OTP!");
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const newPassword = NewPassword.current.value;
    const confirmPassword = ConfirmPassword.current.value;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const email = Email.current.value;

    setLoading(true); // Start loading

    try {
      const response = await axios.put(
        "https://ecoavenstra-be.onrender.com/api/v1/user/change-password",
        { email, newPassword, confirmPassword }
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setForgotPassword(false);
        resetForm();
        navigate("/login"); // Redirect to the login page after password change
      } else {
        toast.error(response.data.message || "Failed to change password!");
      }
    } catch (error) {
      toast.error("Failed to change password!");
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = Email.current.value;
    const password = Password.current.value;
    const name = isRegistering ? Name.current.value : "";
    const role = userToEmployer ? "EMPLOYER" : "USER";

    setLoading(true); // Start loading

    try {
      let response;
      if (isRegistering) {
        response = await axios.post(
          "https://ecoavenstra-be.onrender.com/api/v1/user/signup",
          { name, role, email, password }
        );
      } else {
        response = await axios.post(
          "https://ecoavenstra-be.onrender.com/api/v1/user/login",
          { email, password }
        );
      }

      console.log(response);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("profile_Name", response.data.user.name);
        localStorage.setItem("profile_Email", response.data.user.email);
        localStorage.setItem("profile_Role", response.data.user.role);
      }

      if (userToEmployer) {
        navigate("/employerform");
        toast.success("Logged In as Employer Successfully!");
        dispatch(toggleLogin());
      } else {
        navigate("/");
        toast.success("Logged In as User Successfully!");
        dispatch(toggleLogin());
      }
    } catch (error) {
      toast.error("Invalid Credentials!");
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const resetForm = () => {
    if (Email.current) Email.current.value = "";
    if (Password.current) Password.current.value = "";
    if (Name.current) Name.current.value = "";
    if (OTP.current) OTP.current.value = "";
    if (NewPassword.current) NewPassword.current.value = "";
    if (ConfirmPassword.current) ConfirmPassword.current.value = "";
    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <section className="bg-gray-100 py-10 min-h-screen flex box-border justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl flex max-w-3xl p-8 items-center space-x-6">
        <Toaster />
        <div className="w-full md:w-1/2 px-8">
          <div className="font-bold text-3xl py-4 text-[#002D74]">
            {forgotPassword ? "Forgot Password" : isRegistering
              ? userToEmployer
                ? "Employer Register"
                : "User Register"
              : userToEmployer
              ? "Employer Login"
              : "User Login"}
          </div>

          {!forgotPassword && (
            <p className="text-sm mt-4 mb-8 text-gray-600">
              {isRegistering
                ? "Create your account now."
                : "If you already have an account, log in now."}
            </p>
          )}

          <form onSubmit={forgotPassword ? handleChangePassword : handleSubmit} className="flex flex-col gap-4">
            {forgotPassword && otpSent && !otpVerified && (
              <>
                <input
                  ref={OTP}
                  className="p-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                />
                <button
                  className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#0e4374] font-medium flex items-center justify-center"
                  type="button"
                   onClick={handleVerifyOtp}
                >
                  {loading ? <PulseLoader size={8} color="#ffffff" /> : "Verify OTP"}
                </button>
              </>
            )}

            {!forgotPassword && isRegistering && (
              <input
                ref={Name}
                className="p-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Name"
              />
            )}

            <input
              ref={Email}
              className="p-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Email"
            />

            {!forgotPassword || otpVerified ? (
              <>
                <div className="relative">
                  <input
                    ref={forgotPassword ? NewPassword : Password}
                    className="p-2 rounded-xl border w-full focus:ring-2 focus:ring-blue-500"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={forgotPassword ? "New Password" : "Password"}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className={`bi bi-eye${showPassword ? "-slash-fill" : ""} absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100`}
                    onClick={togglePasswordVisibility}
                    viewBox="0 0 16 16"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash />
                    ) : (
                      <FaRegEye />
                    )}
                  </svg>
                </div>
                {forgotPassword && otpVerified && (
                  <input
                    ref={ConfirmPassword}
                    className="p-2 rounded-xl border focus:ring-2 focus:ring-blue-500"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                )}
              </>
            ) : (
              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#0e4374] font-medium flex items-center justify-center"
                type="button"
                onClick={handleForgotPassword}
              >
                {loading ? <PulseLoader size={8} color="#ffffff" /> : "Send OTP"}
              </button>
            )}

            {(!forgotPassword || otpVerified) && (
              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#0e4374] font-medium flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <PulseLoader size={8} color="#ffffff" /> : (forgotPassword ? "Change Password" : isRegistering ? "Sign Up" : "Login")}
              </button>
            )}
          </form>

          {!forgotPassword && (
            <div className="mt-6 flex justify-between items-center">
              <button className="text-xs underline text-[#002D74]" onClick={toggleRegister}>
                {isRegistering ? "Already have an account?" : "Don't have an account?"}
              </button>
              <button className="text-xs underline text-[#002D74]" onClick={() => setForgotPassword(!forgotPassword)}>
                {forgotPassword ? "Back to Login" : "Forgot Password?"}
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <button className="text-xs underline text-[#002D74]" onClick={toggleToEmployer}>
              {userToEmployer ? "Switch to User" : "Switch to Employer"}
            </button>
          </div>
        </div>

        <div className="hidden md:block w-1/2">
          <img
            className="rounded-2xl object-cover h-full"
            src="src/assets/login_sky.jpg"
            alt="Sample"
          />
        </div>
      </div>
    </section>
  );
};

export default ToggleSignIn;
