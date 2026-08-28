import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function AdminNavbar() {

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");

    };


    const isActive = (path) => {

        return location.pathname === path
            ? "admin-nav-link active"
            : "admin-nav-link";

    };


    return (

        <nav className="admin-navbar">

            {/* LOGO */}

            <Link
                to="/admin/dashboard"
                className="admin-logo"
            >
                dom<b>LEA</b>
            </Link>


            {/* NAVIGATION */}

            <div className="admin-nav-links">

                <Link
                    to="/admin/dashboard"
                    className={isActive(
                        "/admin/dashboard"
                    )}
                >
                    Dashboard
                </Link>


                <Link
                    to="/admin/users"
                    className={isActive(
                        "/admin/users"
                    )}
                >
                    Users
                </Link>


                <Link
                    to="/admin/properties"
                    className={isActive(
                        "/admin/properties"
                    )}
                >
                    Properties
                </Link>



            </div>


            {/* RIGHT SIDE */}

            <div className="admin-nav-right">

                <button
                    type="button"
                    className="admin-profile-btn"
                    onClick={() =>
                        navigate("/profile")
                    }
                >
                    👤
                </button>


                <button
                    type="button"
                    className="admin-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <button
    onClick={() => navigate("/admin/analytics")}
>
    Analytics
</button>

            </div>

        </nav>

    );
}

export default AdminNavbar;