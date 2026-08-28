import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BUYER");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await register({
        fullName,
        email,
        phone,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img
          className="auth-photo"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
          alt="A modern home set in an open field under a clear sky"
        />
        <div className="auth-grid-overlay">
          <div className="v" style={{ left: "18%" }} />
          <div className="v" style={{ left: "82%" }} />
          <div className="h" style={{ top: "20%" }} />
          <div className="circle" style={{ width: 260, height: 260, left: -80, bottom: "10%" }} />
        </div>
        <div className="auth-visual-content">
          <Link to="/" className="auth-logo">
            DOM<b>LEA</b>
          </Link>
          <p className="auth-quote serif">
            "Discover curated homes in prime locations, built around real fit."
          </p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <p className="eyebrow">Get started</p>
          <h1 className="serif auth-title">Create your account</h1>
          <p className="auth-sub">
            Save listings, book visits, and message agents directly from your dashboard.
          </p>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="field">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>I am a</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="BUYER">Buyer</option>
                <option value="SELLER">Seller / Builder</option>
              </select>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-submit" type="submit" disabled={isLoading}>
              {isLoading ? "Registering…" : "Register"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="paren-link">
              (Log in)
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;