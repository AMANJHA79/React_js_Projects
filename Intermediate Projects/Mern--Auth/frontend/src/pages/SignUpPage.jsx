import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Mail, Lock, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Pswd_meter from "../components/Pswd_meter";
import { useAuthStore } from "../store/authStore"; 

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signup, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      alert("Please fill all fields");
      return;
    }

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during signup";
      alert(errorMessage);
      console.error("Signup error:", error.response?.data);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Password Strength Meter */}
          <Pswd_meter password={password} />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={20} /> : "Sign Up"}
          </motion.button>

          <div className="mt-4 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
