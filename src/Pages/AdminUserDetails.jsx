import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/AdminUserDetails.css";

function AdminUserDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, [id]);


    const loadUser = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/api/admin/users/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setUser(response.data);

        } catch (error) {

            console.error(
                "Error loading user:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                navigate("/login");
                return;
            }

            if (error.response?.status === 404) {
                alert("User not found.");
                navigate("/admin/users");
            }

        } finally {

            setLoading(false);

        }
    };


    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };


    if (loading) {

        return (
            <div className="admin-user-details-loading">
                Loading user...
            </div>
        );

    }


    if (!user) {

        return (
            <div className="admin-user-details-loading">
                User not found.
            </div>
        );

    }


    return (

        <div className="admin-page">

            {/* ================= NAVBAR ================= */}

            <nav className="admin-navbar">

                <Link
                    to="/admin/dashboard"
                    className="admin-logo"
                >
                    DOM<b>LEA</b>
                </Link>


                <div className="admin-nav-links">

                    <Link
                        to="/admin/dashboard"
                        className="admin-nav-link"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/users"
                        className="admin-nav-link active"
                    >
                        Users
                    </Link>

                    <Link
                        to="/admin/properties"
                        className="admin-nav-link"
                    >
                        Properties
                    </Link>

                </div>


                <div className="admin-nav-right">

                    <button
                        className="admin-profile-btn"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        👤
                    </button>

                    <button
                        className="admin-logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* ================= CONTENT ================= */}

            <main className="admin-user-details-page">

                <button
                    className="admin-back-btn"
                    onClick={() =>
                        navigate("/admin/users")
                    }
                >
                    ← Back to Users
                </button>


                <div className="admin-user-details-card">

                    {/* PROFILE IMAGE */}

                    <div className="admin-user-details-avatar">

                        <img
                            src={
                                user.profileImage ||
                                "https://placehold.co/150x150?text=User"
                            }
                            alt={
                                user.fullName ||
                                "User"
                            }
                        />

                    </div>


                    {/* NAME */}

                    <div className="admin-user-details-heading">

                        <p className="admin-eyebrow">
                            USER DETAILS
                        </p>

                        <h1>
                            {user.fullName ||
                                "Unknown User"}
                        </h1>

                        <span
                            className={`user-role role-${user.role?.toLowerCase()}`}
                        >
                            {user.role}
                        </span>

                    </div>


                    {/* INFORMATION */}

                    <div className="admin-user-info-grid">

                        <div className="admin-user-info-item">

                            <span>
                                User ID
                            </span>

                            <strong>
                                #{user.id}
                            </strong>

                        </div>


                        <div className="admin-user-info-item">

                            <span>
                                Email
                            </span>

                            <strong>
                                {user.email || "-"}
                            </strong>

                        </div>


                        <div className="admin-user-info-item">

                            <span>
                                Phone
                            </span>

                            <strong>
                                {user.phone || "-"}
                            </strong>

                        </div>


                        <div className="admin-user-info-item">

                            <span>
                                Verification
                            </span>

                            <strong
                                className={
                                    user.verified
                                        ? "verified-status"
                                        : "unverified-status"
                                }
                            >
                                {user.verified
                                    ? "✓ Verified"
                                    : "Not verified"}
                            </strong>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );
}

export default AdminUserDetails;