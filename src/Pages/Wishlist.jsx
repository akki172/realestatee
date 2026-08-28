import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Wishlist.css";

function Wishlist() {

    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);


    // =========================================
    // LOAD WISHLIST
    // =========================================

    useEffect(() => {
        loadWishlist();
    }, []);


    const loadWishlist = () => {

        const savedWishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        setWishlist(savedWishlist);
    };


    // =========================================
    // REMOVE FROM WISHLIST
    // =========================================

    const removeFromWishlist = (propertyId) => {

        const updatedWishlist =
            wishlist.filter(
                (property) =>
                    property.id !== propertyId
            );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        setWishlist(updatedWishlist);
    };


    // =========================================
    // GET PROPERTY IMAGE
    // =========================================

    const getPropertyImage = (property) => {

        if (
            property.imageUrls &&
            property.imageUrls.length > 0
        ) {
            return property.imageUrls[0];
        }

        if (property.imageUrl) {
            return property.imageUrl;
        }

        return "https://placehold.co/700x450?text=Property";
    };


    // =========================================
    // OPEN PROPERTY
    // =========================================

    const openProperty = (propertyId) => {

        navigate(
            `/property/${propertyId}`
        );
    };


    return (

        <div className="wishlist-page">

            {/* ================= HEADER ================= */}

            <div className="wishlist-header">

                <div>

                    <Link
                        to="/Dashboard"
                        className="wishlist-back-btn"
                    >
                        ← Back to Dashboard
                    </Link>


                    <p className="wishlist-eyebrow">
                        SAVED PROPERTIES
                    </p>


                    <h1>
                        My Wishlist
                        <span> ♥ </span>
                    </h1>


                    <p className="wishlist-subtitle">
                        Properties you've saved for later.
                    </p>

                </div>


                <div className="wishlist-count">

                    {wishlist.length}

                    <span>
                        {wishlist.length === 1
                            ? " Property"
                            : " Properties"}
                    </span>

                </div>

            </div>


            {/* ================= EMPTY ================= */}

            {wishlist.length === 0 ? (

                <div className="wishlist-empty">

                    <div className="wishlist-empty-icon">
                        ♡
                    </div>


                    <h2>
                        Your wishlist is empty
                    </h2>


                    <p>
                        Save properties you like and
                        find them here later.
                    </p>


                    <Link
                        to="/property-list"
                        className="wishlist-browse-btn"
                    >
                        Browse Properties
                    </Link>

                </div>

            ) : (

                /* ================= PROPERTY GRID ================= */

                <div className="wishlist-grid">

                    {wishlist.map((property) => (

                        <div
                            key={property.id}
                            className="wishlist-card"
                            onClick={() =>
                                openProperty(property.id)
                            }
                        >

                            {/* ================= IMAGE ================= */}

                            <div className="wishlist-image-wrapper">

                                <img
                                    src={getPropertyImage(
                                        property
                                    )}
                                    alt={
                                        property.title ||
                                        "Property"
                                    }
                                    className="wishlist-image"
                                />


                                {property.listingType && (

                                    <span className="wishlist-listing">

                                        {property.listingType}

                                    </span>

                                )}


                                {/* REMOVE HEART */}

                                <button
                                    type="button"
                                    className="wishlist-remove"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        removeFromWishlist(
                                            property.id
                                        );

                                    }}
                                    title="Remove from wishlist"
                                >
                                    ♥
                                </button>

                            </div>


                            {/* ================= CONTENT ================= */}

                            <div className="wishlist-card-content">

                                <div className="wishlist-property-type">

                                    {property.propertyType ||
                                        "Property"}

                                </div>


                                <h2>
                                    {property.title}
                                </h2>


                                <p className="wishlist-location">

                                    📍{" "}

                                    {property.city ||
                                        "Location"}

                                    {property.state
                                        ? `, ${property.state}`
                                        : ""}

                                </p>


                                <div className="wishlist-price">

                                    ₹{" "}

                                    {Number(
                                        property.price || 0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </div>


                                {/* ================= DETAILS ================= */}

                                <div className="wishlist-details">

                                    {property.bedrooms != null && (

                                        <span>
                                            🛏{" "}
                                            {property.bedrooms}
                                            {" "}
                                            Beds
                                        </span>

                                    )}


                                    {property.bathrooms != null && (

                                        <span>
                                            🛁{" "}
                                            {property.bathrooms}
                                            {" "}
                                            Baths
                                        </span>

                                    )}


                                    {property.area != null && (

                                        <span>
                                            📐{" "}
                                            {property.area}
                                            {" "}
                                            sq.ft
                                        </span>

                                    )}

                                </div>


                                {/* ================= ACTIONS ================= */}

                                <div className="wishlist-actions">

                                    <button
                                        type="button"
                                        className="wishlist-view-btn"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            openProperty(
                                                property.id
                                            );

                                        }}
                                    >
                                        View Details
                                    </button>


                                    <button
                                        type="button"
                                        className="wishlist-remove-btn"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            removeFromWishlist(
                                                property.id
                                            );

                                        }}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Wishlist;