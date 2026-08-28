import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ForgetPassword.css";

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Enter your registered email address.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        { email }
      );

      alert(response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-card">
        <p className="eyebrow">Account recovery</p>
        <h1 className="serif fp-title">Forgot your password?</h1>
        <p className="fp-sub">
          Enter your registered email address and we'll send you a link to reset it.
        </p>

        <form className="fp-form" onSubmit={handleForgotPassword}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        <p className="fp-back">
          Remembered it after all?{" "}
          <Link to="/login" className="paren-link">
            (Back to login)
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;