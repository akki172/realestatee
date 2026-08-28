import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import NotificationBell from "../components/NotificationBell";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link
                to="/dashboard"
                className="navbar-brand"
            >
                DOM<b>LEA</b>
            </Link>

            <div className="navbar-links">

                <Link to="/dashboard">
                    Home
                </Link>

                <Link to="/wishlist">
                    Wishlist
                </Link>

                <Link to="/add-property">
                    Sell Property
                </Link>

                <Link to="/profile">
                    Profile
                </Link>
                 <Link to="/payment-history" className="navbar-payment-link">
    <span className="payment-nav-icon">▣</span>
    <span>Payment History</span>
</Link>
                <NotificationBell />

                <button
                    type="button"
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;