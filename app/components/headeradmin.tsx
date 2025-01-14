"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import logo from "@/app/assets/logo.svg";
import Image from "next/image";

const Header: React.FC = () => {
  const [username, setUsername] = useState("");

  const updateUsername = () => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  useEffect(() => {
    updateUsername();

    const handleStorageChange = () => {
      updateUsername();
    };

    window.addEventListener("username", handleStorageChange);

    return () => {
      window.removeEventListener("username", handleStorageChange);
    };
  }, []);

  return (
    <>
      {/* mobile */}

      {/* Desktop */}
      <div className="navbar bg-base-100 fixed top-0 z-50 px-24 hidden md:flex">
        <div className="grid grid-cols-2 grid-flow-row gap-4 w-full">
          <div className="flex items-center">
            {/* <Image
              width={30}
              height={30}
              src={logo}
              alt="logo"
              className="mr-2"
            /> */}
            <h1 className="font-semibold text-2xl">Makan Gratis</h1>
            {/* <div
              style={{
                backgroundColor: "white",
                height: "10vh",
              }}
            >
              <DigitalClock />
            </div> */}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <details>
                  <summary>Firza</summary>
                  <ul className="p-2 w-300">
                    <li className="w-200">
                      <Link href="/JsonPlaceholder">Data Sekolah</Link>
                    </li>
                    <li className="w-200">
                      <Link href="/Project">Data Guru</Link>
                    </li>
                    <li className="w-200">
                      <Link href="/Project">Data Menu</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <button className="btn bg-green-600 border-none text-white font-medium rounded-sm">
                  {username === "" ? "Register Now" : username}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
