import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/PropertyDetails.css";

import PropertyMap from "../components/PropertyMap";
import PropertyCalculator from "../components/PropertyCalculator";
import PropertyReviews from "../components/PropertyReviews";
import PropertyComments from "../components/PropertyComments";


function PropertyDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [error, setError] = useState("");
    const [showEMI, setShowEMI] = useState(false);

    const [selectedImage, setSelectedImage] = useState("");


    // ============================
    // LOAD PROPERTY
    // ============================

    useEffect(() => {
        loadProperty();
    }, [id]);


    const loadProperty = async () => {

        try {

            setError("");

            const token =
                localStorage.getItem("token");

            if (!token) {

                setError(
                    "Please login to view property details."
                );

                return;
            }


            const response = await axios.get(
                `http://localhost:8080/api/property/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            console.log(
                "Property Details:",
                response.data
            );

            console.log(
                "SELLER ID:",
                response.data.sellerId
            );

            console.log(
                "SELLER NAME:",
                response.data.sellerName
            );

            console.log(
                "LATITUDE:",
                response.data.latitude
            );

            console.log(
                "LONGITUDE:",
                response.data.longitude
            );


            setProperty(response.data);


            // First image

            if (
                response.data.imageUrls &&
                response.data.imageUrls.length > 0
            ) {

                setSelectedImage(
                    response.data.imageUrls[0]
                );

            } else {

                setSelectedImage(
                    "https://placehold.co/1200x700?text=Property"
                );

            }


        } catch (error) {

            console.error(
                "Error fetching property:",
                error
            );


            if (
                error.response?.status === 401
            ) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (
                error.response?.status === 403
            ) {

                setError(
                    "You are not authorized to view this property."
                );

            } else if (
                error.response?.status === 404
            ) {

                setError(
                    "Property not found."
                );

            } else {

                setError(
                    "Failed to load property details."
                );

            }

        }

    };


    // ============================
    // SCHEDULE VISIT
    // ============================

    const handleScheduleVisit = () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            navigate("/login");

            return;
        }


        navigate(
            "/schedule-visit",
            {
                state: {
                    property: property
                }
            }
        );

    };


    // ============================
    // WISHLIST
    // ============================

    const handleWishlistClick = () => {

        const existingWishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];


        const alreadyExists =
            existingWishlist.some(
                (item) =>
                    item.id === property.id
            );


        if (alreadyExists) {

            alert(
                "Property already added to Wishlist ❤️"
            );

            return;
        }


        existingWishlist.push(property);


        localStorage.setItem(
            "wishlist",
            JSON.stringify(existingWishlist)
        );


        alert(
            "Property added to Wishlist ❤️"
        );

    };


    // ============================
    // SELLER PROFILE
    // ============================

   const handleSellerProfile = () => {

    if (!property.sellerId) {
        console.error(
            "Seller ID is missing:",
            property
        );
        return;
    }

    navigate(
        `/seller-profile/${property.sellerId}`
    );
};
    // ============================
    // ERROR
    // ============================
    // ============================
// PAYMENT
// ============================

const handlePayment = () => {

    const token =
        localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    if (property.status !== "AVAILABLE") {
        alert(
            `This property is currently ${property.status}.`
        );
        return;
    }

    navigate(
        `/payment?propertyId=${property.id}`
    );
};

    if (error) {

        return (

            <div className="pd-page">

                <div className="pd-wrap">

                    <Link
                        to="/dashboard"
                        className="pd-back"
                    >
                        ← Back to listings
                    </Link>


                    <h2>
                        {error}
                    </h2>

                </div>

            </div>

        );

    }


    // ============================
    // LOADING
    // ============================

    if (!property) {

        return (

            <div className="pd-page">

                <div className="pd-wrap">

                    <p>
                        Loading property…
                    </p>

                </div>

            </div>

        );

    }


    // ============================
    // GOOGLE MAPS DIRECTIONS
    // ============================

    const handleGetDirections = () => {

        const lat = property.latitude;
        const lng = property.longitude;


        if (!lat || !lng) {

            alert(
                "Property location is not available."
            );

            return;
        }


        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
            "_blank"
        );

    };


    // ============================
    // PAGE
    // ============================

    return (

        <div className="pd-page">

            <div className="pd-wrap">


                {/* ============================
                    BACK
                ============================ */}

                <Link
                    to="/dashboard"
                    className="pd-back"
                >
                    ← Back to listings
                </Link>


                {/* ============================
                    IMAGE GALLERY
                ============================ */}

                <div className="property-gallery">


                    {/* MAIN IMAGE */}

                    <div className="main-property-image">

                        <img
                            src={
                                selectedImage ||
                                "https://placehold.co/1200x700?text=Property"
                            }
                            alt={property.title}
                        />

                    </div>


                    {/* THUMBNAILS */}

                    {property.imageUrls &&
                        property.imageUrls.length > 0 && (

                            <div className="property-thumbnails">

                                {property.imageUrls.map(
                                    (image, index) => (

                                        <img
                                            key={index}
                                            src={image}
                                            alt={
                                                `${property.title} ${index + 1}`
                                            }
                                            className={
                                                selectedImage === image
                                                    ? "thumbnail active"
                                                    : "thumbnail"
                                            }
                                            onClick={() =>
                                                setSelectedImage(
                                                    image
                                                )
                                            }
                                        />

                                    )
                                )}

                            </div>

                        )}

                </div>


                {/* ============================
                    PROPERTY BODY
                ============================ */}

                <div className="pd-body">


                    {/* ============================
                        LEFT SIDE
                    ============================ */}

                    <div>

                        <p className="pd-eyebrow">
                            {property.propertyType}
                        </p>


                        <h1 className="pd-title">
                            {property.title}
                        </h1>


                        <p className="pd-location">
                            📍 {property.city},{" "}
                            {property.state}
                        </p>


                        {/* ============================
                            SPECS
                        ============================ */}

                        <div className="pd-specs">


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Bedrooms
                                </p>

                                <p className="pd-spec-value">
                                    🛏 {property.bedrooms ?? 0}
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Bathrooms
                                </p>

                                <p className="pd-spec-value">
                                    🚿 {property.bathrooms ?? 0}
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Area
                                </p>

                                <p className="pd-spec-value">
                                    📐 {property.area ?? 0} sq.ft
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Balconies
                                </p>

                                <p className="pd-spec-value">
                                    {property.balconies ?? 0}
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Parking
                                </p>

                                <p className="pd-spec-value">
                                    {property.parking ?? 0}
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Furnished
                                </p>

                                <p className="pd-spec-value">
                                    {property.furnished || "N/A"}
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Floor
                                </p>

                                <p className="pd-spec-value">
                                    {property.floor ?? "N/A"}
                                </p>

                            </div>


                            <div className="pd-spec-item">

                                <p className="pd-spec-label">
                                    Total Floors
                                </p>

                                <p className="pd-spec-value">
                                    {property.totalFloors ?? "N/A"}
                                </p>

                            </div>


                        </div>


                        {/* ============================
                            DESCRIPTION
                        ============================ */}

                        <h3 className="pd-section-title">
                            Description
                        </h3>

                        <p className="pd-description">
                            {property.description ||
                                "No description available."}
                        </p>


                        {/* ============================
                            ADDRESS
                        ============================ */}

                        <h3 className="pd-section-title">
                            Address
                        </h3>

                        <p className="pd-description">

                            {property.address}

                            <br />

                            {property.city},{" "}
                            {property.state}

                            <br />

                            {property.pincode}

                        </p>


                        {/* ============================
                            PROPERTY LOCATION
                        ============================ */}

                        <h3 className="pd-section-title">
                            Property Location
                        </h3>


                        <PropertyMap
                            latitude={property.latitude}
                            longitude={property.longitude}
                            title={property.title}
                        />


                        <button
                            className="pd-directions-btn"
                            onClick={handleGetDirections}
                        >
                            🧭 Get Directions
                        </button>

                    </div>


                    {/* ============================
                        RIGHT SIDE
                    ============================ */}

                    <div className="pd-sidebar">


                        {/* ============================
                            PRICE
                        ============================ */}

                        <div className="pd-price-card">

                            <p className="pd-price-label">
                                Asking Price
                            </p>


                            <p className="pd-price">

                                ₹{" "}

                                {Number(
                                    property.price || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </p>


                            {/* ============================
                                ACTIONS
                            ============================ */}

                            <div className="pd-actions">


                                {/* CONTACT SELLER */}

                                <button
                                    className="pd-btn pd-btn-primary"
                                    onClick={() =>
                                        alert(
                                            "Contact Seller feature coming soon."
                                        )
                                    }
                                >
                                    📞 Contact Seller
                                </button>


                                {/* SCHEDULE VISIT */}

                                <button
                                    className="pd-btn pd-btn-secondary"
                                    onClick={
                                        handleScheduleVisit
                                    }
                                >
                                    📅 Schedule Visit
                                </button>
{/* PAY / BOOK PROPERTY */}

{property.status === "AVAILABLE" && (

    <button
        className="pd-btn pd-btn-payment"
        onClick={handlePayment}
    >
        💳 Pay / Book Property
    </button>

)}

                            </div>

                        </div>


                        {/* ============================
                            SELLER
                        ============================ */}

                        <div className="pd-seller-card">

                            <p className="pd-seller-label">
                                Listed by
                            </p>


                            <button
                                type="button"
                                className="seller-name-link"
                                onClick={
                                    handleSellerProfile
                                }
                                
                            >
                                {property.sellerName || "Seller"}
                            </button>


                            <p className="pd-seller-role">
                                Seller
                            </p>

                        </div>


                        {/* ============================
                            WISHLIST + EMI
                        ============================ */}

                        <div className="pd-extra-actions">


                            <button
                                className="pd-btn-outline pd-btn-wishlist"
                                onClick={
                                    handleWishlistClick
                                }
                            >
                                ❤️ Wishlist
                            </button>


                           
                          <button
    className="pd-btn-outline pd-btn-emi"
    onClick={() => navigate("/calculator")}
>
    💰 Calculator
</button>



                        </div>


                    </div>

                </div>


                {/* ============================
                    PROPERTY REVIEWS
                ============================ */}

                <PropertyReviews
                    propertyId={property.id}
                />


                {/* ============================
                    PROPERTY COMMENTS
                ============================ */}

                <PropertyComments
                    propertyId={property.id}
                />


                {/* ============================
                    EMI CALCULATOR MODAL
                ============================ */}

             

            </div>

        </div>
    );
}

export default PropertyDetails;