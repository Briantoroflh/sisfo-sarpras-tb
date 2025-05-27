import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Button from "../components/Button";
import { toast } from "react-toastify";

export default function Login() {
    const token = localStorage.getItem("token");
    if(token) {
        window.location.href = "/dashboard"; // Redirect to dashboard if token exists
    }

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 200) {
                const { token, data, message } = response.data;
                const userRole = data.role;
                if(userRole !== "admin") {
                    toast.error("You do not have permission to access this page.");
                    return;
                }

                toast.success(message) 
                localStorage.setItem("token", token); 
                window.location.href = "/dashboard";
            }
        } catch (error) {
           if (error.response && error.response.data) {
               const msg = error.response.data.message;
               toast.error(msg);
           } else {
               toast.error(
                   "Terjadi kesalahan jaringan atau server tidak merespons."
               );
           }
        }
    };

    return (
        <div className="flex justify-center items-center mt-15">
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                {/* judul */}
                <div className="flex justify-center items-center flex-col ">
                    <img
                        src="/img/logonotext-nobg-zetoonik.png"
                        className="w-15 h-25"
                        alt=""
                    />
                    <h1 className="text-2xl font-medium mt-10">
                        Welcome Back!
                    </h1>
                    <p className="text-sm">Let’s get you signed in securly.</p>
                </div>

                {/* form */}
                <form>
                    <div className="mt-5">
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium text-neutral-950 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-100 px-3 py-2 border border-neutral-700 rounded outline-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mt-5">
                        <label
                            htmlFor="password"
                            className="block text-lg font-medium text-neutral-950 mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                className="w-100 px-3 py-2 border border-neutral-700 rounded outline-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <EyeOff
                                        size={20}
                                        className="text-gray-500"
                                    />
                                ) : (
                                    <Eye size={20} className="text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <Button onClick={handleSubmit}>Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
