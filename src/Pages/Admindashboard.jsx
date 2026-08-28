import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/admindashboard.css";
import AdminNavbar from "../components/AdminNavbar";


function AdminDashboard() {

    const navigate = useNavigate();


  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalBuyers: 0,
    totalSellers: 0,

    totalProperties: 0,
    availableProperties: 0,
    bookedProperties: 0,
    soldProperties: 0,
    rentedProperties: 0,

    totalEnquiries: 0,

    successfulPayments: 0,
    totalSalesValue: 0
});


    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD DASHBOARD
    // =========================================

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                navigate("/login");

                return;

            }


            const response = await axios.get(
                "http://localhost:8080/api/admin/dashboard",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            console.log(
                "Admin Dashboard:",
                response.data
            );


            setDashboard(response.data);


        } catch (error) {

            console.error(
                "Admin Dashboard Error:",
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
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="admin-loading">

                Loading Admin Dashboard...

            </div>

        );

    }


    // =========================================
    // DASHBOARD
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

            <main className="admin-dashboard">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="admin-header">

                    <div>

                        <p className="admin-eyebrow">
                            ADMIN PORTAL
                        </p>


                        <h1>
                            Admin Dashboard
                        </h1>


                        <p>
                            Manage users, properties and
                            platform activity.
                        </p>

                    </div>

                </div>


                {/* =================================
                    USERS
                ================================= */}

                <section>

                    <h2 className="admin-section-title">
                        Users
                    </h2>


                    <div className="admin-cards">


                        {/* TOTAL USERS */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                👥
                            </div>


                            <span>
                                Total Users
                            </span>


                            <strong>
                                {dashboard.totalUsers}
                            </strong>

                        </div>


                        {/* SELLERS */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                🏠
                            </div>


                            <span>
                                Sellers
                            </span>


                            <strong>
                                {dashboard.totalSellers}
                            </strong>

                        </div>


                        {/* BUYERS */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                👤
                            </div>


                            <span>
                                Buyers
                            </span>


                            <strong>
                                {dashboard.totalBuyers}
                            </strong>

                        </div>


                    </div>

                </section>


                {/* =================================
                    PROPERTIES
                ================================= */}

                <section>

                    <h2 className="admin-section-title">
                        Properties
                    </h2>


                    <div className="admin-cards">


                        {/* TOTAL */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                🏘️
                            </div>


                            <span>
                                Total Properties
                            </span>


                            <strong>
                                {dashboard.totalProperties}
                            </strong>

                        </div>


                        {/* AVAILABLE */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                🟢
                            </div>


                            <span>
                                Available
                            </span>


                            <strong>
                                {dashboard.availableProperties}
                            </strong>

                        </div>


                        {/* BOOKED */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                📅
                            </div>


                            <span>
                                Booked
                            </span>


                            <strong>
                                {dashboard.bookedProperties}
                            </strong>

                        </div>


                        {/* RENTED */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                🔑
                            </div>


                            <span>
                                Rented
                            </span>


                            <strong>
                                {dashboard.rentedProperties}
                            </strong>

                        </div>
                        {/* SOLD */}

<div className="admin-card">

    <div className="admin-card-icon">
        🏆
    </div>

    <span>
        Sold
    </span>

    <strong>
        {dashboard.soldProperties}
    </strong>

</div>


                    </div>

                </section>


                {/* =================================
                    PLATFORM ACTIVITY
                ================================= */}

                <section>

                    <h2 className="admin-section-title">
                        Platform Activity
                    </h2>


                    <div className="admin-cards">


                        {/* ENQUIRIES */}

                        <div className="admin-card">

                            <div className="admin-card-icon">
                                📩
                            </div>


                            <span>
                                Total Enquiries
                            </span>


                            <strong>
                                {dashboard.totalEnquiries}
                            </strong>

                        </div>
                        {/* SUCCESSFUL PAYMENTS */}

<div className="admin-card">

    <div className="admin-card-icon">
        💳
    </div>

    <span>
        Successful Payments
    </span>

    <strong>
        {dashboard.successfulPayments}
    </strong>

</div>


{/* TOTAL SALES VALUE */}

<div className="admin-card">

    <div className="admin-card-icon">
        💰
    </div>

    <span>
        Total Sales Value
    </span>

    <strong>
        ₹{Number(
            dashboard.totalSalesValue || 0
        ).toLocaleString("en-IN")}
    </strong>

</div>


                    </div>

                </section>


            </main>

        </div>

    );

}


export default AdminDashboard;