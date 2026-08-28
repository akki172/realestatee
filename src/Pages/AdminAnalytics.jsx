import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/AdminAnalytics.css";
import AdminNavbar from "../components/AdminNavbar";

function AdminAnalytics() {

    const navigate = useNavigate();

    const [analytics, setAnalytics] = useState({
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

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD ANALYTICS
    // =========================================

    useEffect(() => {

        const loadAnalytics = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    navigate("/login");

                    return;
                }


                // =========================================
                // DASHBOARD ANALYTICS
                // =========================================

                const response = await axios.get(
                    "http://localhost:8080/api/admin/dashboard",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                setAnalytics(
                    response.data
                );


                // =========================================
                // USER ACTIVITY ANALYTICS
                // =========================================

                const activityResponse =
                    await axios.get(
                        "http://localhost:8080/api/admin/analytics/activity",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                setActivities(
                    activityResponse.data
                );


                console.log(
                    "Admin Analytics:",
                    response.data
                );


                console.log(
                    "User Activities:",
                    activityResponse.data
                );


            } catch (error) {

                console.error(
                    "Admin Analytics Error:",
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


        loadAnalytics();

    }, [navigate]);


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="admin-analytics-loading">

                Loading Analytics...

            </div>

        );

    }


    // =========================================
    // DASHBOARD
    // =========================================

    return (

        <div className="admin-analytics-page">

            <AdminNavbar />


            <main className="admin-analytics">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="analytics-header">

                    <p className="admin-eyebrow">
                        ADMIN PORTAL
                    </p>


                    <h1>
                        Analytics
                    </h1>


                    <p>
                        Monitor platform performance
                        and business activity.
                    </p>

                </div>


                {/* =================================
                    USER ANALYTICS
                ================================= */}

                <section>

                    <h2 className="analytics-section-title">
                        User Analytics
                    </h2>


                    <div className="analytics-cards">


                        <div className="analytics-card">

                            <span>
                                Total Users
                            </span>

                            <strong>
                                {analytics.totalUsers}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Buyers
                            </span>

                            <strong>
                                {analytics.totalBuyers}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Sellers
                            </span>

                            <strong>
                                {analytics.totalSellers}
                            </strong>

                        </div>


                    </div>

                </section>


                {/* =================================
                    PROPERTY ANALYTICS
                ================================= */}

                <section>

                    <h2 className="analytics-section-title">
                        Property Analytics
                    </h2>


                    <div className="analytics-cards">


                        <div className="analytics-card">

                            <span>
                                Total Properties
                            </span>

                            <strong>
                                {analytics.totalProperties}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Available
                            </span>

                            <strong>
                                {analytics.availableProperties}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Booked
                            </span>

                            <strong>
                                {analytics.bookedProperties}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Sold
                            </span>

                            <strong>
                                {analytics.soldProperties}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Rented
                            </span>

                            <strong>
                                {analytics.rentedProperties}
                            </strong>

                        </div>


                    </div>

                </section>


                {/* =================================
                    BUSINESS ANALYTICS
                ================================= */}

                <section>

                    <h2 className="analytics-section-title">
                        Business Analytics
                    </h2>


                    <div className="analytics-cards">


                        <div className="analytics-card">

                            <span>
                                Successful Payments
                            </span>

                            <strong>
                                {analytics.successfulPayments}
                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Total Sales Value
                            </span>

                            <strong>

                                ₹{Number(
                                    analytics.totalSalesValue || 0
                                ).toLocaleString("en-IN")}

                            </strong>

                        </div>


                        <div className="analytics-card">

                            <span>
                                Total Enquiries
                            </span>

                            <strong>
                                {analytics.totalEnquiries}
                            </strong>

                        </div>


                    </div>

                </section>


                {/* =================================
                    USER ACTIVITY ANALYTICS
                ================================= */}

                <section>

                    <h2 className="analytics-section-title">

                        User Activity Analytics

                    </h2>


                    <div className="analytics-cards">


                        {activities.length === 0 ? (

                            <div className="analytics-coming-soon">

                                <h3>
                                    No Activity Yet
                                </h3>

                                <p>
                                    User activity will appear
                                    here when users view
                                    properties, search
                                    properties, or complete
                                    payments.
                                </p>

                            </div>

                        ) : (

                            activities.map(
                                (activity) => (

                                    <div
                                        className="analytics-card"
                                        key={
                                            activity.activityType
                                        }
                                    >

                                        <span>

                                            {activity.activityType
                                                ?.replaceAll(
                                                    "_",
                                                    " "
                                                )
                                                .toLowerCase()
                                                .replace(
                                                    /\b\w/g,
                                                    char =>
                                                        char.toUpperCase()
                                                )}

                                        </span>


                                        <strong>

                                            {activity.count}

                                        </strong>


                                    </div>

                                )
                            )

                        )}

                    </div>

                </section>


                {/* =================================
                    USER BEHAVIOR INFORMATION
                ================================= */}

                <section>

                    <h2 className="analytics-section-title">

                        User Behavior

                    </h2>


                    <div className="analytics-coming-soon">

                        <h3>
                            Understanding Your Users
                        </h3>


                        <p>
                            This section will show
                            popular locations,
                            frequently viewed
                            properties, popular
                            property types and
                            search behavior.
                        </p>


                    </div>

                </section>


            </main>

        </div>

    );

}


export default AdminAnalytics;