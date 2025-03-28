import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://nt-devconnector.onrender.com/api/auth", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      });
  };

  return (
    <div className="w-[800px] mx-auto mt-[50px]">
      <h2 className="text-[48px] font-bold text-blue-500">Sign In</h2>
      <form className="flex flex-col mt-[20px]" onSubmit={handleSubmit}>
        <input
          className="w-full p-[12px] border-[2px] border-[#ccc] rounded-[8px] text-[16px] transition-all duration-300 ease-in-out my-[10px]"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-[10px] border-[2px] border-[#ccc] rounded-[5px] text-[16px] transition duration-300 my-[8px]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-[120px] h-[40px] bg-blue-500 text-white text-[16px] mt-[20px] flex items-center justify-center rounded-md">
          Login
        </button>
        <Link className="text-[16px] text-blue-500 mt-[30px]" to="/register">
          Sign Up
        </Link>
      </form>
    </div>
  );
}

export default Login;
