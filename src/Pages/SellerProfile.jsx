import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../css/SellerProfile.css";

function SellerProfile() {

    const { sellerId } = useParams();
    const navigate = useNavigate();

    const [seller, setSeller] = useState(null);
    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // LOAD SELLER PROFILE + PROPERTIES
    // =========================================

    useEffect(() => {

        if (sellerId) {
            loadSellerData();
        }

    }, [sellerId]);


    const loadSellerData = async () => {

        try {

            setLoading(true);
            setError("");


            // =====================================
            // GET SELLER PROFILE
            // =====================================

            const sellerResponse = await axios.get(
                `http://localhost:8080/api/seller-profile/${sellerId}`
            );

            console.log(
                "SELLER PROFILE:",
                sellerResponse.data
            );

            setSeller(sellerResponse.data);


            // =====================================
            // GET SELLER PROPERTIES
            // =====================================

            const propertyResponse = await axios.get(
                `http://localhost:8080/api/property/seller/${sellerId}`
            );

            console.log(
                "SELLER PROPERTIES:",
                propertyResponse.data
            );

            setProperties(propertyResponse.data);


        } catch (err) {

            console.error(
                "Error loading seller profile:",
                err
            );

            setError(
                "Unable to load seller profile."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="seller-profile-loading">
                    Loading seller profile...
                </div>
            </>
        );
    }


    // =========================================
    // ERROR
    // =========================================

    if (error && !seller) {

        return (
            <>
                <Navbar />

                <div className="seller-profile-page">

                    <p className="seller-profile-error">
                        {error}
                    </p>

                </div>
            </>
        );
    }


    // =========================================
    // SELLER NAME
    // =========================================

    const sellerName =
        seller?.fullName || "Seller";


    // =========================================
    // SELLER INITIAL
    // =========================================

    const sellerInitial =
        sellerName
            .charAt(0)
            .toUpperCase();


    return (

        <>
            <Navbar />

            <div className="seller-profile-page">


                {/* =====================================
                    SELLER HEADER
                ===================================== */}

                <section className="seller-profile-header">


                    {/* SELLER IMAGE / INITIAL */}

                    <div className="seller-profile-avatar">

                        {seller?.profileImage ? (

                            <img
                                src={seller.profileImage}
                                alt={sellerName}
                            />

                        ) : (

                            sellerInitial

                        )}

                    </div>


                    {/* SELLER DETAILS */}

                    <div className="seller-profile-info">

                        <p className="seller-profile-label">
                            PROPERTY SELLER
                        </p>


                        <h1>
                            {sellerName}
                        </h1>


                        <div className="seller-profile-badges">

                            <span className="seller-role">
                                Seller
                            </span>


                            {seller?.verified && (

                                <span className="seller-verified">
                                    ✓ Verified Seller
                                </span>

                            )}

                        </div>

                    </div>

                </section>


                {/* =====================================
                    SELLER STATS
                ===================================== */}

                <section className="seller-profile-stats">


                    <div className="seller-stat-card">

                        <strong>
                            {seller?.propertyCount ??
                                properties.length}
                        </strong>

                        <span>
                            Properties Listed
                        </span>

                    </div>


                    <div className="seller-stat-card">

                        <strong>
                            {seller?.verified
                                ? "✓"
                                : "—"}
                        </strong>

                        <span>
                            Verification
                        </span>

                    </div>

                </section>


                {/* =====================================
                    CONTACT SELLER
                ===================================== */}

                <section className="seller-contact-card">

                    <div>

                        <p className="seller-contact-label">
                            CONTACT SELLER
                        </p>

                        <h2>
                            Interested in a property?
                        </h2>

                        <p>
                            Contact {sellerName} for
                            more information.
                        </p>

                    </div>


                    <button
                        className="seller-contact-btn"
                        onClick={() =>
                            alert(
                                "Contact Seller feature coming soon."
                            )
                        }
                    >
                        Contact Seller
                    </button>

                </section>


                {/* =====================================
                    SELLER PROPERTIES
                ===================================== */}

                <section className="seller-properties">


                    <div className="seller-properties-heading">

                        <p>
                            LISTED PROPERTIES
                        </p>

                        <h2>
                            Properties by {sellerName}
                        </h2>

                    </div>


                    {error && (

                        <p className="seller-profile-error">
                            {error}
                        </p>

                    )}


                    {properties.length === 0 ? (

                        <div className="seller-no-properties">

                            This seller has no listed
                            properties.

                        </div>

                    ) : (

                        <div className="seller-properties-grid">

                            {properties.map((property) => (

                                <div
                                    className="seller-property-card"
                                    key={property.id}
                                    onClick={() =>
                                        navigate(
                                            `/property/${property.id}`
                                        )
                                    }
                                >


                                    {/* PROPERTY IMAGE */}

                                    <div className="seller-property-image">

                                        {property.imageUrls &&
                                        property.imageUrls.length > 0 ? (

                                            <img
                                                src={
                                                    property.imageUrls[0]
                                                }
                                                alt={
                                                    property.title
                                                }
                                            />

                                        ) : (

                                            <div>
                                                No Image
                                            </div>

                                        )}

                                    </div>


                                    {/* PROPERTY DETAILS */}

                                    <div className="seller-property-content">

                                        <h3>
                                            {property.title}
                                        </h3>


                                        <p>
                                            {property.city}

                                            {property.state
                                                ? `, ${property.state}`
                                                : ""}
                                        </p>


                                        <strong>

                                            ₹
                                            {Number(
                                                property.price || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </strong>


                                        <div className="seller-property-meta">

                                            <span>
                                                {property.bedrooms || 0}
                                                {" "}Beds
                                            </span>


                                            <span>
                                                {property.bathrooms || 0}
                                                {" "}Baths
                                            </span>


                                            <span>
                                                {property.area || 0}
                                                {" "}sq.ft
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>
        </>
    );
}

export default SellerProfile;