import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/PropertyList.css";
import AIAssistant from "../components/AIAssistant";


function PropertyList() {

    const [properties, setProperties] = useState([]);

    // Search / Filter states
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [listingType, setListingType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [bedrooms, setBedrooms] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        fetchAllProperties();
    }, []);


    // ================================
    // AUTH HEADERS
    // ================================

    const getHeaders = () => {

        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };


    // ================================
    // LOAD ALL PROPERTIES
    // ================================

    const fetchAllProperties = async () => {

        try {

            setLoading(true);
            setError("");

           const response = await axios.get(
    "http://localhost:8080/api/property/all",
    getHeaders()
);

console.log(
    "BUYER PROPERTY STATUS:",
    response.data.map(p => ({
        id: p.id,
        title: p.title,
        status: p.status
    }))
);

setProperties(response.data);

            

        } catch (error) {

            console.error(
                "Error fetching properties:",
                error
            );

            setError(
                "Unable to load properties."
            );

        } finally {

            setLoading(false);

        }
    };


    // ================================
    // SEARCH + FILTER
    // ================================

    const searchProperties = async () => {

        try {

            setLoading(true);
            setError("");

            const params = new URLSearchParams();


            // City

            if (city.trim() !== "") {

                params.append(
                    "city",
                    city.trim()
                );

            }


            // Sale / Rent

            if (listingType !== "") {

                params.append(
                    "listingType",
                    listingType
                );

            }


            // Property Type

            if (type !== "") {

                params.append(
                    "propertyType",
                    type
                );

            }


            // Minimum Price

            if (minPrice !== "") {

                params.append(
                    "minPrice",
                    minPrice
                );

            }


            // Maximum Price

            if (maxPrice !== "") {

                params.append(
                    "maxPrice",
                    maxPrice
                );

            }


            // Bedrooms

            if (bedrooms !== "") {

                params.append(
                    "bedrooms",
                    bedrooms
                );

            }


            // No filters selected

            if (params.toString() === "") {

                await fetchAllProperties();

                return;

            }


            const response = await axios.get(

                `http://localhost:8080/api/property/search?${params.toString()}`,

                getHeaders()

            );


            setProperties(
                response.data
            );


        } catch (error) {

            console.error(
                "Search error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to search properties."
            );

        } finally {

            setLoading(false);

        }
    };


    // ================================
    // CLEAR FILTERS
    // ================================

    const clearFilters = () => {

        setCity("");
        setType("");
        setListingType("");
        setMinPrice("");
        setMaxPrice("");
        setBedrooms("");

        fetchAllProperties();

    };


    return (

        <div className="pl-page">

            <main className="pl-main">


                {/* ================================
                    HEADING
                ================================= */}

                <div className="pl-heading">

                    <span className="eyebrow">
                        Find your next home
                    </span>

                    <h1>
                        Available Properties
                    </h1>

                </div>


                {/* ================================
                    SEARCH / FILTERS
                ================================= */}

                <div className="search-bar">


                    {/* Listing Type */}

                    <div className="search-field-wrap">

                        <label>
                            Listing
                        </label>

                        <select
                            value={listingType}
                            onChange={(e) =>
                                setListingType(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Buy / Rent
                            </option>

                            <option value="SALE">
                                Buy
                            </option>

                            <option value="RENT">
                                Rent
                            </option>

                        </select>

                    </div>


                    {/* Bedrooms */}

                    <div className="search-field-wrap">

                        <label>
                            Bedrooms
                        </label>

                        <select
                            value={bedrooms}
                            onChange={(e) =>
                                setBedrooms(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Any
                            </option>

                            <option value="1">
                                1+ Bedrooms
                            </option>

                            <option value="2">
                                2+ Bedrooms
                            </option>

                            <option value="3">
                                3+ Bedrooms
                            </option>

                            <option value="4">
                                4+ Bedrooms
                            </option>

                        </select>

                    </div>


                    {/* Location */}

                    <div className="search-field-wrap">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="Search City"
                            value={city}
                            onChange={(e) =>
                                setCity(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Property Type */}

                    <div className="search-field-wrap">

                        <label>
                            Property Type
                        </label>

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Any type
                            </option>

                            <option value="APARTMENT">
                                Apartment
                            </option>

                            <option value="VILLA">
                                Villa
                            </option>

                            <option value="INDEPENDENT_HOUSE">
                                Independent House
                            </option>

                            <option value="PLOT">
                                Plot
                            </option>

                            <option value="COMMERCIAL">
                                Commercial
                            </option>

                        </select>

                    </div>


                    {/* Minimum Budget */}

                    <div className="search-field-wrap">

                        <label>
                            Minimum Budget
                        </label>

                        <input
                            type="number"
                            placeholder="₹ Min"
                            value={minPrice}
                            onChange={(e) =>
                                setMinPrice(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Maximum Budget */}

                    <div className="search-field-wrap">

                        <label>
                            Maximum Budget
                        </label>

                        <input
                            type="number"
                            placeholder="₹ Max"
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Buttons */}

                    <div className="search-actions">

                        <button
                            className="btn-search"
                            onClick={
                                searchProperties
                            }
                        >
                            Search
                        </button>


                        <button
                            className="btn-reset"
                            onClick={
                                clearFilters
                            }
                        >
                            Reset
                        </button>

                    </div>

                </div>


                {/* ================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="pl-error">
                        {error}
                    </div>

                )}


                {/* ================================
                    LOADING
                ================================= */}

                {loading ? (

                    <div className="pl-loading">

                        <span className="pl-spinner"></span>

                        <p>
                            Loading properties...
                        </p>

                    </div>

                ) : properties.length === 0 ? (

                    <p className="pl-empty">
                        No properties available.
                    </p>

                ) : (

                    <>


                        {/* ================================
                            COUNT
                        ================================= */}

                        <p className="pl-count">

                            {properties.length}{" "}

                            {properties.length === 1
                                ? "property"
                                : "properties"}

                            {" "}available

                        </p>


                        {/* ================================
                            PROPERTY GRID
                        ================================= */}

                        <div className="property-grid">

                            {properties.map(
                                (property) => (

                                    <div
                                        key={
                                            property.id
                                        }
                                        className="property-card"
                                    >


                                        {/* IMAGE */}
<div
    className={`property-card-img-wrap ${
        property.status === "SOLD"
            ? "property-sold"
            : ""
    }`}
>

    <img
        className="property-card-img"
        src={
            property.imageUrls &&
            property.imageUrls.length > 0
                ? property.imageUrls[0]
                : "https://placehold.co/600x400?text=Property"
        }
        alt={property.title || "Property"}
    />

    {property.status === "SOLD" && (
        <div className="sold-image-overlay">
            SOLD
        </div>
    )}

    {/* PROPERTY TYPE */}
    <span className="property-card-type">
        {property.propertyType}
    </span>

    {/* ADMIN VERIFIED */}
    {property.verified && (
        <span className="verified-badge">
            🔵 Verified
        </span>
    )}

</div>
                                        {/* CARD BODY */}

                                        <div className="property-card-body">


                                            <h2 className="property-card-title">

                                                {
                                                    property.title
                                                }

                                            </h2>


                                            <p className="property-card-location">

                                                📍{" "}

                                                {
                                                    property.city
                                                }

                                                {
                                                    property.state
                                                        ? `, ${property.state}`
                                                        : ""
                                                }

                                            </p>


                                            {/* PROPERTY DETAILS */}

                                            <div className="property-card-meta">

                                                <span>

                                                    🛏{" "}

                                                    {
                                                        property.bedrooms ??
                                                        0
                                                    }

                                                    {" "}Beds

                                                </span>


                                                <span>

                                                    🚿{" "}

                                                    {
                                                        property.bathrooms ??
                                                        0
                                                    }

                                                    {" "}Baths

                                                </span>


                                                <span>

                                                    📐{" "}

                                                    {
                                                        property.area ??
                                                        0
                                                    }

                                                    {" "}sq.ft

                                                </span>


                                                <span
                                                    className={`property-status ${
                                                        property.status?.toLowerCase() ||
                                                        "available"
                                                    }`}
                                                >

                                                    {
                                                        property.status ===
                                                        "SOLD"

                                                            ? "🔴 Sold"

                                                            : property.status ===
                                                              "RENTED"

                                                                ? "🟠 Rented"

                                                                : "🟢 Available"
                                                    }

                                                </span>

                                            </div>


                                            {/* FOOTER */}

                                            <div className="property-card-footer">


                                                <p className="property-card-price">

                                                    ₹{" "}

                                                    {
                                                        Number(
                                                            property.price ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </p>


                                                <Link
                                                    to={`/property/${property.id}`}
                                                >

                                                    <button
                                                        className="details-btn"
                                                    >
                                                        View Details
                                                    </button>

                                                </Link>

                                            </div>


                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </>

                )}
                <AIAssistant />

            </main>

        </div>

    );

}

export default PropertyList;