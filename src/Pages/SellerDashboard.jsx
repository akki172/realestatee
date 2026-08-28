import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/SellerDashboard.css";

import SellerPropertyComments
    from "../components/SellerPropertyComments";

import SellerNavbar
    from "../components/SellerNavbar";


function SellerDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalProperties: 0,
        pendingVisits: 0,
        totalEnquiries: 0
    });


    // =========================================
    // LOAD SELLER DASHBOARD
    // =========================================

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const sellerId =
                Number(localStorage.getItem("userId"));

            const token =
                localStorage.getItem("token");


            if (!sellerId || !token) {

                navigate("/login");

                return;
            }


            const response = await axios.get(
                `http://localhost:8080/api/seller/dashboard/${sellerId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            console.log(
                "Seller Dashboard:",
                response.data
            );


            setDashboard(response.data);


        } catch (error) {

            console.error(
                "Error loading seller dashboard:",
                error
            );


            if (
                error.response?.status === 401
            ) {

                localStorage.clear();

                navigate("/login");
            }

        }

    };


    // =========================================
    // DASHBOARD
    // =========================================

    return (

        <div className="seller-page">


            {/* =================================
                SELLER NAVBAR
            ================================= */}

            <SellerNavbar />


            {/* =================================
                MAIN DASHBOARD
            ================================= */}

            <main className="seller-dashboard">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="seller-header">

                    <div>

                        <p className="seller-eyebrow">
                            Seller Portal
                        </p>


                        <h1>
                            Seller Dashboard
                        </h1>


                        <p className="seller-subtitle">
                            Manage your properties,
                            visits and buyer comments.
                        </p>

                    </div>


                    <button
                        className="seller-primary-action"
                        onClick={() =>
                            navigate(
                                "/seller/add-property"
                            )
                        }
                    >
                        + Add New Property
                    </button>

                </div>


                {/* =================================
                    DASHBOARD CARDS
                ================================= */}

                <div className="dashboard-cards">


                    {/* TOTAL PROPERTIES */}

                    <div className="dashboard-card">

                        <div className="dashboard-card-icon">
                            🏠
                        </div>


                        <div>

                            <p>
                                Total Properties
                            </p>


                            <h2>
                                {dashboard.totalProperties}
                            </h2>

                        </div>

                    </div>


                    {/* PENDING VISITS */}

                    <div className="dashboard-card">

                        <div className="dashboard-card-icon">
                            📅
                        </div>


                        <div>

                            <p>
                                Pending Visits
                            </p>


                            <h2>
                                {dashboard.pendingVisits}
                            </h2>

                        </div>

                    </div>


                    {/* PROPERTY COMMENTS */}

                    <div className="dashboard-card">

                        <div className="dashboard-card-icon">
                            💬
                        </div>


                        <div>

                            <p>
                                Property Comments
                            </p>


                            <h2>
                                {dashboard.totalEnquiries}
                            </h2>

                        </div>

                    </div>

                </div>


                {/* =================================
                    QUICK ACTIONS
                ================================= */}

                <section className="seller-actions-section">

                    <div className="section-heading">

                        <p className="seller-eyebrow">
                            Manage
                        </p>


                        <h2>
                            Quick Actions
                        </h2>

                    </div>


                    <div className="dashboard-actions">


                        {/* ADD PROPERTY */}

                        <button
                            type="button"
                            className="seller-action-card"
                            onClick={() =>
                                navigate(
                                    "/seller/add-property"
                                )
                            }
                        >

                            <span className="action-icon">
                                ➕
                            </span>


                            <span>

                                <strong>
                                    Add Property
                                </strong>


                                <small>
                                    List a new property
                                </small>

                            </span>

                        </button>


                        {/* MY PROPERTIES */}

                        <button
                            type="button"
                            className="seller-action-card"
                            onClick={() =>
                                navigate(
                                    "/seller/properties"
                                )
                            }
                        >

                            <span className="action-icon">
                                🏠
                            </span>


                            <span>

                                <strong>
                                    My Properties
                                </strong>


                                <small>
                                    Manage your listings
                                </small>

                            </span>

                        </button>


                        {/* VISIT REQUESTS */}

                        <button
                            type="button"
                            className="seller-action-card"
                            onClick={() =>
                                navigate(
                                    "/seller/visits"
                                )
                            }
                        >

                            <span className="action-icon">
                                📅
                            </span>


                            <span>

                                <strong>
                                    Visit Requests
                                </strong>


                                <small>
                                    Review buyer visits
                                </small>

                            </span>

                        </button>


                        {/* PROPERTY COMMENTS */}

                        <button
                            type="button"
                            className="seller-action-card"
                            onClick={() => {

                                document
                                    .getElementById(
                                        "seller-property-comments"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });

                            }}
                        >

                            <span className="action-icon">
                                💬
                            </span>


                            <span>

                                <strong>
                                    Property Comments
                                </strong>


                                <small>
                                    Reply to buyer questions
                                </small>

                            </span>

                        </button>


                        {/* ANALYTICS */}

                        <button
                            type="button"
                            className="seller-action-card"
                            onClick={() =>
                                navigate(
                                    "/seller/analytics"
                                )
                            }
                        >

                            <span className="action-icon">
                                📊
                            </span>


                            <span>

                                <strong>
                                    Analytics
                                </strong>


                                <small>
                                    View property performance
                                </small>

                            </span>

                        </button>


                    </div>

                </section>


                {/* =================================
                    PROPERTY COMMENTS
                ================================= */}

                <section
                    id="seller-property-comments"
                    className="seller-dashboard-comments"
                >

                    <SellerPropertyComments />

                </section>


            </main>

        </div>
    );
}


export default SellerDashboard;