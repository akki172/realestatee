import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/SellerNavbar.css";
import NotificationBell from "./NotificationBell";

function SellerNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "seller-nav-link active"
      : "seller-nav-link";

  return (
    <nav className="seller-navbar">

      {/* Logo */}
      <Link to="/seller/dashboard" className="navbar-brand">
        DOM<b>LEA</b>
      </Link>

      {/* Links */}
      <div className="navbar-links">

        <Link to="/seller/properties" className={isActive("/seller/properties")}>
          My Properties
        </Link>

        <Link to="/seller/visits" className={isActive("/seller/visits")}>
          Visit Requests
        </Link>

        <Link to="/seller/analytics" className={isActive("/seller/analytics")}>
          Analytics
        </Link>

        <button
          type="button"
          className="bookings-nav-btn"
          onClick={() => navigate("/seller/bookings")}
        >
          Bookings & Payments
        </button>

        {/* Add Property */}
        <button
          type="button"
          className="seller-add-button"
          onClick={() => navigate("/seller/add-property")}
        >
          + Add Property
        </button>

        {/* Notification */}
        <NotificationBell />

        {/* Profile */}
        <button
          type="button"
          className="seller-profile-button"
          onClick={() => navigate("/profile")}
        >
          👤
        </button>

        {/* Logout */}
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default SellerNavbar;