import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../css/AdminProperties.css";
import AdminNavbar from "../components/AdminNavbar";


function AdminProperties() {

    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);


    // =========================================
    // LOAD PROPERTIES
    // =========================================

    useEffect(() => {
        loadProperties();
    }, []);


    const loadProperties = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }


            const response = await axios.get(
                "http://localhost:8080/api/admin/properties",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setProperties(response.data);


        } catch (error) {

            console.error(
                "Error loading properties:",
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
    // DELETE PROPERTY
    // =========================================

    const handleDelete = async (propertyId) => {

        const confirmed = window.confirm(
            "Are you sure you want to remove this property?"
        );


        if (!confirmed) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await axios.delete(
                `http://localhost:8080/api/admin/properties/${propertyId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setProperties(previous =>
                previous.filter(
                    property =>
                        property.id !== propertyId
                )
            );


            alert(
                "Property removed successfully."
            );


        } catch (error) {

            console.error(
                "Error deleting property:",
                error
            );


            alert(
                error.response?.data ||
                "Failed to remove property."
            );
        }
    };


    // =========================================
    // VERIFY PROPERTY
    // =========================================

    const handleVerify = async (propertyId) => {

        const confirmed = window.confirm(
            "Verify this property?"
        );


        if (!confirmed) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await axios.put(
                `http://localhost:8080/api/admin/properties/${propertyId}/verify`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setProperties(previous =>
                previous.map(property =>
                    property.id === propertyId
                        ? {
                            ...property,
                            verified: true
                        }
                        : property
                )
            );


            alert(
                "Property verified successfully."
            );


        } catch (error) {

            console.error(
                "Error verifying property:",
                error
            );


            alert(
                error.response?.data ||
                "Failed to verify property."
            );
        }
    };


    // =========================================
    // UNVERIFY PROPERTY
    // =========================================

    const handleUnverify = async (propertyId) => {

        const confirmed = window.confirm(
            "Remove verification from this property?"
        );


        if (!confirmed) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await axios.put(
                `http://localhost:8080/api/admin/properties/${propertyId}/unverify`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            setProperties(previous =>
                previous.map(property =>
                    property.id === propertyId
                        ? {
                            ...property,
                            verified: false
                        }
                        : property
                )
            );


            alert(
                "Property verification removed."
            );


        } catch (error) {

            console.error(
                "Error unverifying property:",
                error
            );


            alert(
                error.response?.data ||
                "Failed to remove verification."
            );
        }
    };


    // =========================================
    // STATUS CLASS
    // =========================================

    const statusClass = (status) => {

        switch (status?.toLowerCase()) {

            case "available":
                return "property-status available";

            case "booked":
                return "property-status booked";

            case "rented":
                return "property-status rented";

            default:
                return "property-status";
        }
    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <div className="admin-properties-loading">
                Loading properties...
            </div>
        );
    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="admin-page">


            {/* ADMIN NAVBAR */}

            <AdminNavbar />


            {/* CONTENT */}

            <main className="admin-properties-page">


                {/* HEADER */}

                <div className="admin-properties-header">

                    <div>

                        <p className="admin-eyebrow">
                            PROPERTY MANAGEMENT
                        </p>


                        <h1>
                            All Properties
                        </h1>


                        <p>
                            Review and manage properties
                            listed by sellers.
                        </p>

                    </div>


                    <div className="properties-count">

                        {properties.length} Properties

                    </div>

                </div>


                {/* PROPERTY LIST */}

                {properties.length === 0 ? (

                    <div className="no-properties">
                        No properties found.
                    </div>

                ) : (

                    <div className="admin-property-grid">

                        {properties.map(
                            (property) => (

                            <div
                                className="admin-property-card"
                                key={property.id}
                            >


                                {/* IMAGE */}

                                <div className="admin-property-image">

                                    <img
                                        src={
                                            property.imageUrls?.[0] ||
                                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                                        }
                                        alt={
                                            property.title ||
                                            "Property"
                                        }
                                    />


                                    {/* PROPERTY STATUS */}

                                    <span
                                        className={statusClass(
                                            property.status
                                        )}
                                    >
                                        {property.status ||
                                            "N/A"}
                                    </span>


                                    {/* VERIFIED BADGE */}

                                    {property.verified && (

                                        <span className="admin-verified-badge">
                                            🔵 Verified
                                        </span>

                                    )}

                                </div>


                                {/* CONTENT */}

                                <div className="admin-property-content">


                                    <h2>
                                        {property.title}
                                    </h2>


                                    <p className="admin-property-location">
                                        📍{" "}
                                        {property.city}

                                        {property.state
                                            ? `, ${property.state}`
                                            : ""}
                                    </p>


                                    <div className="admin-property-price">

                                        ₹
                                        {Number(
                                            property.price || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </div>


                                    {/* DETAILS */}

                                    <div className="admin-property-details">

                                        <span>
                                            {property.propertyType}
                                        </span>

                                        <span>
                                            {property.listingType}
                                        </span>

                                    </div>


                                    {/* SELLER */}

                                    <div className="admin-property-seller">

                                        <span>
                                            Seller
                                        </span>

                                        <strong>
                                            {
                                                property.sellerName ||
                                                "Unknown"
                                            }
                                        </strong>

                                    </div>


                                    {/* VIEW */}

                                    <button
                                        type="button"
                                        className="admin-view-property-btn"
                                        onClick={() =>
                                            navigate(
                                                `/property/${property.id}`
                                            )
                                        }
                                    >
                                        View Property
                                    </button>


                                    {/* VERIFY */}

                                    {property.verified ? (

                                        <button
                                            type="button"
                                            className="admin-unverify-property-btn"
                                            onClick={() =>
                                                handleUnverify(
                                                    property.id
                                                )
                                            }
                                        >
                                            Remove Verification
                                        </button>

                                    ) : (

                                        <button
                                            type="button"
                                            className="admin-verify-property-btn"
                                            onClick={() =>
                                                handleVerify(
                                                    property.id
                                                )
                                            }
                                        >
                                            🔵 Verify Property
                                        </button>

                                    )}


                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        className="admin-delete-property-btn"
                                        onClick={() =>
                                            handleDelete(
                                                property.id
                                            )
                                        }
                                    >
                                        Remove Property
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}


export default AdminProperties;