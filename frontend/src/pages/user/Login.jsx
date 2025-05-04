import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await loginUser(data).unwrap(); // Assuming loginUser is your API call
      console.log(response); // Log response from the API
      if (response.token) {
        // If login is successful, dispatch setUser to save user info in Redux and localStorage
        dispatch(setUser({ user: response.user }));
        alert("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {message && (
            <p className="text-center text-red-500 font-medium">{message}</p>
          )}

          <button
            disabled={loginLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
