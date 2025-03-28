import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://nt-devconnector.onrender.com/api/users", { name, email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => console.error("Registration error:", err));
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold text-blue-500">Sign Up</h2>
      <p className="flex items-center gap-2 text-lg text-gray-700 mt-2">
        <i className="fa-solid fa-user"></i> Create Your Account
      </p>

      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        <input
          className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg transition-all focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg transition-all focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 my-2 border-2 border-gray-300 rounded-md text-lg transition-all focus:outline-none focus:border-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full p-3 mt-4 bg-blue-500 text-white font-medium text-lg rounded-md hover:bg-blue-600 transition-all">
          Register
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <Link className="text-blue-500 hover:underline" to="/login">
          Sign In
        </Link>
        <Link className="text-blue-500 hover:underline" to="/posts">
          Posts
        </Link>
      </div>
    </div>
  );
}

export default Register;
