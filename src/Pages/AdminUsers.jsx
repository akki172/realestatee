import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/AdminUsers.css";
import AdminNavbar from "../components/AdminNavbar";


function AdminUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD USERS
    // =========================================

    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {

                navigate("/login");

                return;
            }


            const response = await axios.get(
                "http://localhost:8080/api/admin/users",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setUsers(response.data);


        } catch (error) {

            console.error(
                "Error loading users:",
                error
            );


            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                navigate("/login");

            }

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // ACTIVATE USER
    // =========================================

    const activateUser = async (id) => {

        try {

            const token =
                localStorage.getItem("token");


            await axios.put(
                `http://localhost:8080/api/admin/users/${id}/activate`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setUsers(prev =>
                prev.map(user =>
                    user.id === id
                        ? {
                            ...user,
                            active: true
                        }
                        : user
                )
            );


        } catch (error) {

            console.error(
                "Error activating user:",
                error
            );

            alert("Unable to activate user.");

        }

    };


    // =========================================
    // DEACTIVATE USER
    // =========================================

    const deactivateUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to deactivate this user?"
        );


        if (!confirmed) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await axios.put(
                `http://localhost:8080/api/admin/users/${id}/deactivate`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setUsers(prev =>
                prev.map(user =>
                    user.id === id
                        ? {
                            ...user,
                            active: false
                        }
                        : user
                )
            );


        } catch (error) {

            console.error(
                "Error deactivating user:",
                error
            );

            alert("Unable to deactivate user.");

        }

    };


    // =========================================
    // DELETE USER
    // =========================================

    const deleteUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this user?"
        );


        if (!confirmed) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await axios.delete(
                `http://localhost:8080/api/admin/users/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setUsers(prev =>
                prev.filter(
                    user => user.id !== id
                )
            );


        } catch (error) {

            console.error(
                "Error deleting user:",
                error
            );

            alert(
                "Unable to delete user. Check whether this user has related data."
            );

        }

    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="admin-users-loading">

                Loading users...

            </div>

        );

    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="admin-page">


            {/* =================================
                ADMIN NAVBAR
            ================================= */}

            <AdminNavbar />


            {/* =================================
                CONTENT
            ================================= */}

            <main className="admin-users-page">


                {/* HEADER */}

                <div className="admin-users-header">

                    <div>

                        <p className="admin-eyebrow">
                            USER MANAGEMENT
                        </p>


                        <h1>
                            All Users
                        </h1>


                        <p>
                            Manage registered buyers
                            and sellers.
                        </p>

                    </div>


                    <div className="users-count">

                        {users.length} Users

                    </div>

                </div>


                {/* =================================
                    USER TABLE
                ================================= */}

                <div className="users-table-container">

                    {users.length === 0 ? (

                        <div className="no-users">

                            No users found.

                        </div>

                    ) : (

                        <table className="users-table">

                            <thead>

                                <tr>

                                    <th>
                                        User
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Verified
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map(
                                    (user) => (

                                    <tr
                                        key={user.id}
                                    >


                                        {/* USER */}

                                        <td>

                                            <div className="admin-user-info">

                                                {user.profileImage ? (

                                                    <img
                                                        src={
                                                            user.profileImage
                                                        }
                                                        alt={
                                                            user.fullName
                                                        }
                                                        className="admin-user-image"
                                                    />

                                                ) : (

                                                    <div className="admin-user-placeholder">
                                                        👤
                                                    </div>

                                                )}


                                                <strong>

                                                    {user.fullName}

                                                </strong>

                                            </div>

                                        </td>


                                        {/* EMAIL */}

                                        <td>
                                            {user.email}
                                        </td>


                                        {/* PHONE */}

                                        <td>
                                            {user.phone || "-"}
                                        </td>


                                        {/* ROLE */}

                                        <td>

                                            <span
                                                className={
                                                    `user-role role-${user.role?.toLowerCase()}`
                                                }
                                            >
                                                {user.role}
                                            </span>

                                        </td>


                                        {/* ACTIVE */}

                                        <td>

                                            {user.active ? (

                                                <span className="user-status active">
                                                    Active
                                                </span>

                                            ) : (

                                                <span className="user-status inactive">
                                                    Inactive
                                                </span>

                                            )}

                                        </td>


                                        {/* VERIFIED */}

                                        <td>

                                            {user.verified ? (

                                                <span className="user-verified">
                                                    ✓ Verified
                                                </span>

                                            ) : (

                                                <span className="user-unverified">
                                                    Not Verified
                                                </span>

                                            )}

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="admin-user-actions">


                                                {/* VIEW */}

                                                <button
                                                    type="button"
                                                    className="user-view-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/users/${user.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>


                                                {/* ACTIVATE / DEACTIVATE */}

                                                {user.active ? (

                                                    <button
                                                        type="button"
                                                        className="user-deactivate-btn"
                                                        onClick={() =>
                                                            deactivateUser(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        Deactivate
                                                    </button>

                                                ) : (

                                                    <button
                                                        type="button"
                                                        className="user-activate-btn"
                                                        onClick={() =>
                                                            activateUser(
                                                                user.id
                                                            )
                                                        }
                                                    >
                                                        Activate
                                                    </button>

                                                )}


                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    className="user-delete-btn"
                                                    onClick={() =>
                                                        deleteUser(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>


                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </main>

        </div>

    );

}


export default AdminUsers;