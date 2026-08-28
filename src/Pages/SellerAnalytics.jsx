import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import "../css/SellerAnalytics.css";
import SellerNavbar from "../components/SellerNavbar";


function SellerAnalytics() {

    const navigate = useNavigate();


    // =========================================
    // DASHBOARD DATA
    // =========================================

    const [dashboard, setDashboard] = useState({
    totalProperties: 0,
    pendingVisits: 0,
    totalEnquiries: 0,

    availableProperties: 0,
    bookedProperties: 0,
    soldProperties: 0,
    rentedProperties: 0,

    saleListings: 0,
    rentListings: 0,

    apartmentCount: 0,
    villaCount: 0,
    independentHouseCount: 0,
    plotCount: 0,
    commercialCount: 0,

    totalSalesValue: 0
});


    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD ANALYTICS
    // =========================================

    useEffect(() => {

        loadAnalytics();

    }, []);


    const loadAnalytics = async () => {

        try {

            const sellerId =
                Number(
                    localStorage.getItem("userId")
                );

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
                "Seller Analytics Response:",
                response.data
            );


            setDashboard(response.data);


        } catch (error) {

            console.error(
                "Seller Analytics Error:",
                error
            );


            if (
                error.response?.status === 401
            ) {

                localStorage.clear();

                navigate("/login");

            }

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // PROPERTY STATUS
    // =========================================

    const statusData = [
    {
        name: "Available",
        value: dashboard.availableProperties
    },
    {
        name: "Booked",
        value: dashboard.bookedProperties
    },
    {
        name: "Sold",
        value: dashboard.soldProperties
    },
    {
        name: "Rented",
        value: dashboard.rentedProperties
    }
];


    // =========================================
    // PROPERTY TYPES
    // =========================================

    const propertyTypeData = [

        {
            name: "Apartment",

            value:
                dashboard.apartmentCount
        },

        {
            name: "Villa",

            value:
                dashboard.villaCount
        },

        {
            name: "Independent House",

            value:
                dashboard.independentHouseCount
        },

        {
            name: "Plot",

            value:
                dashboard.plotCount
        },

        {
            name: "Commercial",

            value:
                dashboard.commercialCount
        }

    ];


    // =========================================
    // LISTING TYPE
    // =========================================

    const listingTypeData = [

        {
            name: "Sale",

            value:
                dashboard.saleListings
        },

        {
            name: "Rent",

            value:
                dashboard.rentListings
        }

    ];


    // =========================================
    // SELLER ACTIVITY
    // =========================================

    const activityData = [

        {
            name: "Properties",

            value:
                dashboard.totalProperties
        },

        {
            name: "Visits",

            value:
                dashboard.pendingVisits
        },

        {
            name: "Enquiries",

            value:
                dashboard.totalEnquiries
        }

    ];


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="seller-page">

                <SellerNavbar />

                <div className="analytics-loading">

                    Loading analytics...

                </div>

            </div>

        );

    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="seller-page">


            {/* =================================
                COMMON SELLER NAVBAR
            ================================= */}

            <SellerNavbar />


            {/* =================================
                ANALYTICS PAGE
            ================================= */}

            <main className="analytics-page">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="analytics-header">

    <p className="seller-eyebrow">
        Seller Insights
    </p>

    <h1>
        Property Analytics
    </h1>

    <p>
        Overview of your property
        performance.
    </p>

    <button
        className="back-dashboard-btn"
        onClick={() => navigate("/seller/dashboard")}
    >
        ← Back to Dashboard
    </button>

</div>


                {/* =================================
                    SUMMARY CARDS
                ================================= */}

                <div className="analytics-cards">


                    {/* TOTAL PROPERTIES */}

                    <div className="analytics-card">

                        <span>
                            Total Properties
                        </span>


                        <strong>

                            {dashboard.totalProperties}

                        </strong>

                    </div>


                    {/* AVAILABLE */}

                    <div className="analytics-card">

                        <span>
                            Available
                        </span>


                        <strong>

                            {dashboard.availableProperties}

                        </strong>

                    </div>


                    {/* BOOKED */}

                    <div className="analytics-card">

                        <span>
                            Booked
                        </span>


                        <strong>

                            {dashboard.bookedProperties}

                        </strong>

                    </div>

                     {/* SOLD */}

<div className="analytics-card">

    <span>
        Sold
    </span>

    <strong>
        {dashboard.soldProperties}
    </strong>

</div>
                    {/* RENTED */}

                    <div className="analytics-card">

                        <span>
                            Rented
                        </span>


                        <strong>

                            {dashboard.rentedProperties}

                        </strong>

                    </div>


                    {/* TOTAL SALES VALUE */}

                    <div className="analytics-card">

                        <span>
                            Total Sales Value
                        </span>


                        <strong>

                            ₹
                            {Number(
                                dashboard.totalSalesValue || 0
                            ).toLocaleString("en-IN")}

                        </strong>

                    </div>

                </div>


                {/* =================================
                    CHARTS
                ================================= */}

                <div className="analytics-grid">


                    {/* =================================
                        PROPERTY STATUS
                    ================================= */}

                    <section className="analytics-panel">

                        <div className="analytics-panel-header">

                            <h2>
                                Property Status
                            </h2>


                            <p>
                                Available, booked and rented
                                properties
                            </p>

                        </div>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={105}
                                    label
                                >

                                    {statusData.map(
                                        (entry, index) => (

                                            <Cell
                                                key={`status-${index}`}
                                            />

                                        )
                                    )}

                                </Pie>


                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </section>


                    {/* =================================
                        PROPERTY TYPES
                    ================================= */}

                    <section className="analytics-panel">

                        <div className="analytics-panel-header">

                            <h2>
                                Property Types
                            </h2>


                            <p>
                                Distribution by property type
                            </p>

                        </div>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={propertyTypeData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />


                                <XAxis
                                    dataKey="name"
                                />


                                <YAxis />


                                <Tooltip />


                                <Bar
                                    dataKey="value"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </section>


                    {/* =================================
                        LISTING TYPE
                    ================================= */}

                    <section className="analytics-panel">

                        <div className="analytics-panel-header">

                            <h2>
                                Listing Type
                            </h2>


                            <p>
                                Sale versus rent listings
                            </p>

                        </div>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <PieChart>

                                <Pie
                                    data={listingTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={105}
                                    label
                                >

                                    {listingTypeData.map(
                                        (entry, index) => (

                                            <Cell
                                                key={`listing-${index}`}
                                            />

                                        )
                                    )}

                                </Pie>


                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </section>


                    {/* =================================
                        SELLER ACTIVITY
                    ================================= */}

                    <section className="analytics-panel">

                        <div className="analytics-panel-header">

                            <h2>
                                Seller Activity
                            </h2>


                            <p>
                                Properties, visits and enquiries
                            </p>

                        </div>


                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={activityData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />


                                <XAxis
                                    dataKey="name"
                                />


                                <YAxis />


                                <Tooltip />


                                <Bar
                                    dataKey="value"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </section>

                </div>


                {/* =================================
                    SALES SUMMARY
                ================================= */}

                <section className="sales-summary">


                    {/* SALE LISTINGS */}

                    <div>

                        <span>
                            Sale Listings
                        </span>


                        <h2>

                            {dashboard.saleListings}

                        </h2>

                    </div>


                    {/* RENT LISTINGS */}

                    <div>

                        <span>
                            Rent Listings
                        </span>


                        <h2>

                            {dashboard.rentListings}

                        </h2>

                    </div>


                    {/* TOTAL SALES VALUE */}

                    <div>

                        <span>
                            Total Sales Value
                        </span>


                        <h2>

                            ₹
                            {Number(
                                dashboard.totalSalesValue || 0
                            ).toLocaleString("en-IN")}

                        </h2>

                    </div>


                </section>


            </main>

        </div>

    );

}


export default SellerAnalytics;