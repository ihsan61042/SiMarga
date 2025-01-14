"use client";
import React, { useState, useEffect, FormEvent } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  interface LoginResponse {
    IsSuccess: Boolean;
    IdUser: Number;
    Role: string;
  }

  useEffect(() => {
    const isLogin = localStorage.getItem("IsLogin");
    if (isLogin === "True") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `https://samaktamitrapt-dev.outsystemsenterprise.com/MakanGratis/rest/Login/LoginUser?Username=${username}&Password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const Output: LoginResponse = await response.json();

      if (Output.IsSuccess) {
        localStorage.setItem("username", username); // Save username to localStorage
        localStorage.setItem("IsLogin", "True");
        localStorage.setItem("Role", Output.Role);
        localStorage.setItem("IdUser", Output.IdUser.toString());
        setIsLoggedIn(true);
        window.location.href = "../"; // alert("Login success.");
      } else {
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.setItem("IsLogin", "False");
    setIsLoggedIn(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-green-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {isLoggedIn ? (
          <div className="text-center">
            <p className="mb-4">You are already logged in.</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
