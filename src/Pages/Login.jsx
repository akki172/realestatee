import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../css/Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setError("Enter your email and password.");
            return;
        }

        try {

            setIsLoading(true);
            setError("");

            const response = await login({
                email,
                password
            });

            console.log("LOGIN RESPONSE:", response.data);

            const token = response.data.token;
            const userEmail = response.data.email;
            const role = response.data.role;
            const userId = response.data.userId;

            // Check token
            if (!token) {
                setError("Login failed. Token not received.");
                return;
            }

            // Store login information
            localStorage.setItem("token", token);
            localStorage.setItem("email", userEmail);
            localStorage.setItem("role", role);
            localStorage.setItem("isLoggedIn", "true");

            // Store userId if backend sends it
            if (userId) {
                localStorage.setItem("userId", userId);
            }

            console.log("TOKEN:", token);
            console.log("EMAIL:", userEmail);
            console.log("ROLE:", role);
            console.log("USER ID:", userId);

            // Role-based navigation
            if (role === "BUYER") {

                console.log("Opening Buyer Dashboard");

                navigate("/dashboard");

            } else if (role === "SELLER") {

                console.log("Opening Seller Dashboard");

                navigate("/seller/dashboard");

            } else if (role === "ADMIN") {

                console.log("Opening Admin Dashboard");

                navigate("/admin/dashboard");

            } else {

                console.log("Unknown role:", role);

                setError("Invalid user role.");

            }

        } catch (err) {

            console.error("Login Error:", err);
            console.error("Backend Response:", err.response);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Invalid email or password."
            );

        } finally {

            setIsLoading(false);

        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("isLoggedIn");

        navigate("/login");
    };

    const handleGoogleLogin = () => {

        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";

    };

    return (

        <div className="auth-page">

            {/* LEFT SIDE */}

            <div className="auth-visual">

                <img
                    className="auth-photo"
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
                    alt="A modern home set in an open field under a clear sky"
                />

                <div className="auth-grid-overlay">

                    <div
                        className="v"
                        style={{ left: "18%" }}
                    />

                    <div
                        className="v"
                        style={{ left: "82%" }}
                    />

                    <div
                        className="h"
                        style={{ top: "20%" }}
                    />

                    <div
                        className="circle"
                        style={{
                            width: 260,
                            height: 260,
                            left: -80,
                            bottom: "10%"
                        }}
                    />

                </div>

                <div className="auth-visual-content">

                    <Link
                        to="/"
                        className="auth-logo"
                    >
                        DOM<b>LEA</b>
                    </Link>

                    <p className="auth-quote serif">
                        "Homes that match your pace, not just your budget."
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="auth-form-side">

                <div className="auth-form-wrap">

                    <p className="eyebrow">
                        Welcome back
                    </p>

                    <h1 className="serif auth-title">
                        Log in to your account
                    </h1>

                    <p className="auth-sub">
                        Track saved homes, manage visit requests,
                        and pick up where you left off.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleLogin}
                    >

                        {/* EMAIL */}

                        <div className="field">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                        </div>

                        {/* PASSWORD */}

                        <div className="field">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>

                        {/* FORGOT PASSWORD */}

                        <div className="auth-forgot">

                            <Link
                                to="/forgot-password"
                                className="paren-link"
                            >
                                Forgot password?
                            </Link>

                        </div>

                        {/* ERROR */}

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                        {/* LOGIN BUTTON */}

                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={isLoading}
                        >

                            {isLoading
                                ? "Signing in…"
                                : "Log in"
                            }

                        </button>

                    </form>

                    {/* DIVIDER */}

                    <div className="divider">

                        <span>
                            OR
                        </span>

                    </div>

                    {/* GOOGLE LOGIN */}

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >

                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            aria-hidden="true"
                        >

                            <path
                                fill="#4285F4"
                                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"
                            />

                            <path
                                fill="#34A853"
                                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
                            />

                            <path
                                fill="#FBBC05"
                                d="M3.96 10.71A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33z"
                            />

                            <path
                                fill="#EA4335"
                                d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"
                            />

                        </svg>

                        Continue with Google

                    </button>

                    {/* REGISTER */}

                    <p className="auth-switch">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="paren-link"
                        >
                            (Register here)
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}