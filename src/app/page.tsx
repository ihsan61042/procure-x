"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
// import { json } from "stream/consumers";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface LoginRequest {
    email: string;
    password: string;
  }
  interface Role {
    IdRole: number;
    RoleName: string;
  }
  interface LoginResponsApiKevin {
    Username?: string;
    Id?: number;
    Name?: string;
    Email?: string;
    Address?: string;
    Roles?: Role[];
    AccessToken?: string;
    RefreshToken?: string;
    IsSuccess: boolean;
  }

  useEffect(() => {
    const isLogin = localStorage.getItem("IsLogin");
    if (isLogin === "True") {
      //setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    localStorage.setItem("Role", "Admin");
    window.location.href = "../admin";
    // const loginRequest: LoginRequest = {
    //   email: username,
    //   password: password,
    // };
    // try {
    //   const response = await fetch(
    //     //`https://nodejskevin-hfdhandkc4awe5hz.southeastasia-01.azurewebsites.net/auth`,
    //     `https://samaktamitrapt-dev.outsystemsenterprise.com/MakanGratis/rest/Login/LoginUser`,
    //     {
    //       method: "POST",
    //       mode: "no-cors", // Added to bypass CORS
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(loginRequest),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const output: LoginResponsApiKevin = await response.json();

    //   if (output.IsSuccess) {
    //     localStorage.setItem("username", username);
    //     localStorage.setItem("IsLogin", "True");
    //     // localStorage.setItem("Role", output.Role);
    //     // localStorage.setItem("accessToken", output.AccessToken);
    //     // localStorage.setItem("refreshToken", output.RefreshToken);
    //     setIsLoading(false);
    //     // const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    //     // const expires = new Date(Date.now() + oneMonth).toUTCString();
    //     // document.cookie = `accessToken=${output.AccessToken}; path=/; expires=${expires};`;
    //     // document.cookie = `refreshToken=${output.RefreshToken}; path=/;`;

    //     // window.location.href = "../admin";
    //     if (output.Roles && output.Roles.length > 0) {
    //       const isAdmin = output.Roles.some(
    //         (role) => role.RoleName === "Admin"
    //       );

    //       const isPIC = output.Roles.some(
    //         (role) => role.RoleName === "PICSekolah"
    //       );

    //       const isSiswa = output.Roles.some(
    //         (role) => role.RoleName === "Siswa"
    //       );

    //       if (isAdmin) {
    //         localStorage.setItem("Role", "Admin");
    //         window.location.href = "../admin";
    //       } else if (isPIC) {
    //         localStorage.setItem("Role", "Admin");
    //         window.location.href = "../user";
    //       } else if (isSiswa) {
    //         localStorage.setItem("Role", "Admin");
    //         window.location.href = "../user";
    //       } else {
    //         alert("Role not found");
    //       }
    //     } else {
    //       alert("Role not found");
    //     }
    //     // switch (output.Role) {
    //     //   case "Admin":
    //     //     window.location.href = "../admin";
    //     //     break;
    //     //   case "PICSekolah":
    //     //     window.location.href = "../guru";
    //     //     break;
    //     //   default:
    //     //     window.location.href = "../siswa";
    //     // }
    //   } else {
    //     alert("Login failed. Please check your username and password.");
    //   }
    // } catch (error) {
    //   console.error("There was a problem with the fetch operation:", error);
    //   setIsLoading(false);
    //   alert("An error occurred. Please try again later.");
    // }
  };

  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex m-1 items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-green-600">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-3xl shadow-lg w-1/3">
            <img
              src="Bean Eater@1x-1.0s-200px-200px.gif"
              alt="Loading..."
              className="mx-auto"
            />
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl mx-4" // Perbesar ukuran box login
      >
        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="w-full lg:w-1/2 flex items-center justify-center" // Responsif untuk gambar
        >
          <img
            src="Free_Lunch_Program_Pak_Prabowo.jpg"
            alt="Free Lunch"
            className="w-full h-auto max-w-md lg:max-w-lg" // Perbesar dan responsif gambar
          />
        </motion.figure>
        <div className="card-body w-full lg:w-1/2 p-6 lg:p-8">
          {" "}
          {/* Perbesar dan responsif card body */}
          <h2 className="card-title text-2xl lg:text-3xl mb-4">Login</h2>{" "}
          {/* Perbesar judul */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm lg:text-base font-bold mb-2" // Responsif teks
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm lg:text-base" // Responsif input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm lg:text-base font-bold mb-2" // Responsif teks
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-sm lg:text-base" // Responsif input
                id="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end">
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm lg:text-base" // Responsif tombol
                type="submit"
              >
                Sign In
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
