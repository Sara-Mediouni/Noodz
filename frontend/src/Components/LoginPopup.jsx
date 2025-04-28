import React, { useEffect, useState } from "react";
import { AnimatePresence ,motion} from "framer-motion";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const LoginPopup = ({ isOpen, onClose, type, toggleType }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState(""); // Ajout d'un état pour les erreurs
  const url = type === "Login" ? "login" : "register";
  const navigate = useNavigate();
  const countries = useSelector((state) => state.country.countries);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // or setError('') if you prefer
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Clean up the timer if component unmounts
    }
  }, [error]);
  const Login = () => {
    axios
      .post(`http://localhost:4000/api/user/${url}`, form)
      .then((response) => {
        if (response.data.success) {
          dispatch(setToken(response.data.token));
          dispatch(setUser(jwtDecode(response.data.token).id));

          onClose();
          navigate("/");
        } else setError(response?.data?.message || "An Error has Occured.");
      })
      .catch((error) => {
        setError(error.response?.data?.message || "An Error has Occured.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <IoClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {type === "Login" ? <>Welcome back </> : <>Welcome </>}
            </h2>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {type === "Signup" && (
                <>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      value={form?.firstname}
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstname"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                    />
                    <input
                      type="text"
                      onChange={handleChange}
                      name="lastname"
                      value={form?.lastname}
                      placeholder="Last Name"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="city"
                      value={form?.city}
                      placeholder="City"
                      onChange={handleChange}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                    />
                    <input
                      type="text"
                      name="address"
                      value={form?.address}
                      placeholder="Address"
                      onChange={handleChange}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="phone"
                      value={form?.phone}
                      placeholder="Phone"
                      onChange={handleChange}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                    />
                    <select
                      name="country"
                      value={form?.country}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                    >
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={form?.email}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form?.password}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
              />
              {type === "Signup" && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={form?.confirmPassword}
                  name="confirmPassword"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition"
                />
              )}
              <button
                type="submit"
                className="bg-orange-300 text-white py-3 rounded-lg font-semibold hover:bg-violet/90 transition"
              >
                {type === "Login" ? "Log In" : "Sign Up"}
              </button>
            </form>

            {/* Error messages */}
            {error && (
              <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-4">
              {type === "Login" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => toggleType("Signup")}
                    className="text-orange-300 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <button
                    onClick={() => toggleType("Login")}
                    className="text-orange-300 hover:underline font-medium"
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
