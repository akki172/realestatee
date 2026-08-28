import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SellerNavbar from "../components/SellerNavbar";

import "../css/Myproperty.css";

import {
    getSellerProperties,
    deleteProperty,
    updatePropertyStatus
} from "../services/PropertyService";


function MyProperties() {

    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // =====================================
    // LOAD SELLER PROPERTIES
    // =====================================

    useEffect(() => {

        loadProperties();

    }, []);


    const loadProperties = async () => {

        try {

            setLoading(true);

            const sellerId =
                localStorage.getItem("userId");


            if (!sellerId) {

                console.error(
                    "Seller ID not found"
                );

                return;
            }


            const response =
                await getSellerProperties(
                    sellerId
                );


            console.log(
                "Seller Properties:",
                response.data
            );


            setProperties(response.data);


        } catch (error) {

            console.error(
                "Error loading seller properties:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // DELETE PROPERTY
    // =====================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this property?"
            );


        if (!confirmed) {
            return;
        }


        try {

            const response =
                await deleteProperty(id);


            alert(
                response.data ||
                "Property Deleted Successfully"
            );


            setProperties(
                (previous) =>
                    previous.filter(
                        (property) =>
                            property.id !== id
                    )
            );


        } catch (error) {

            console.error(
                "Delete property error:",
                error
            );


            alert(
                error.response?.data ||
                "Failed to delete property."
            );

        }

    };


    // =====================================
    // STATUS CHANGE
    // =====================================

    const handleStatusChange =
        async (id, status) => {

        try {

            const response =
                await updatePropertyStatus(
                    id,
                    status
                );


            alert(
                response.data ||
                "Property status updated successfully"
            );


            await loadProperties();


        } catch (error) {

            console.error(
                "Status update error:",
                error
            );


            alert(
                error.response?.data ||
                "Failed to update property status"
            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <>

                <SellerNavbar />

                <div className="my-properties-container">

                    <div className="properties-loading">

                        Loading your properties...

                    </div>

                </div>

            </>

        );

    }


    // =====================================
    // MAIN
    // =====================================

    return (

        <>

            <SellerNavbar />


            <div className="my-properties-page">

                <div className="my-properties-container">


                    {/* HEADING */}

                    <div className="my-properties-heading">

                        <span>
                            SELLER
                        </span>
 
 <button
    className="back-dashboard-btn"
    onClick={() => navigate("/seller/dashboard")}
>
    ← Back to Dashboard
</button>
                        <h1>
                            My Properties
                        </h1>

                    </div>


                    {/* PROPERTY COUNT */}

                    {properties.length > 0 && (

                        <p className="properties-count">

                            {properties.length}{" "}

                            {properties.length === 1
                                ? "property"
                                : "properties"}

                            {" "}listed

                        </p>

                    )}


                    {/* EMPTY */}

                    {properties.length === 0 ? (

                        <div className="no-properties">

                            <p>
                                No properties added yet.
                            </p>

                        </div>

                    ) : (

                        <div className="my-properties-grid">

                            {properties.map(
                                (property) => (

                                <div
                                    className="my-property-card"
                                    key={property.id}
                                >


                                    {/* IMAGE */}

                                    <div className="my-property-image-wrap">

                                        <img
                                            className="my-property-image"

                                            src={
                                                property.imageUrls &&
                                                property.imageUrls.length > 0

                                                    ? property.imageUrls[0]

                                                    : "https://placehold.co/600x400?text=Property"
                                            }

                                            alt={
                                                property.title ||
                                                "Property"
                                            }
                                        />


                                        {/* TYPE */}

                                        <span className="my-property-type">

                                            {
                                                property.propertyType ||
                                                "PROPERTY"
                                            }

                                        </span>

                                    </div>


                                    {/* BODY */}

                                    <div className="my-property-body">


                                        {/* TITLE */}

                                        <h2 className="my-property-title">

                                            {property.title}

                                        </h2>


                                        {/* LOCATION */}

                                        <p className="my-property-location">

                                            📍{" "}

                                            {property.city}

                                            {property.state
                                                ? `, ${property.state}`
                                                : ""}

                                        </p>


                                        {/* DETAILS */}

                                        <div className="my-property-info">

                                            <span>
                                                🛏{" "}
                                                {property.bedrooms ?? 0}
                                                {" "}Beds
                                            </span>

                                            <span>
                                                🚿{" "}
                                                {property.bathrooms ?? 0}
                                                {" "}Baths
                                            </span>

                                            <span>
                                                📐{" "}
                                                {property.area ?? 0}
                                                {" "}sq.ft
                                            </span>

                                        </div>


                                        {/* PRICE */}

                                        <p className="my-property-price">

                                            ₹{" "}

                                            {Number(
                                                property.price || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </p>


                                        {/* STATUS */}

                                        <div className="property-status-section">

                                            <label>
                                                Property Status
                                            </label>

                                            <select
                                                value={
                                                    property.status ||
                                                    "AVAILABLE"
                                                }

                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        property.id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="AVAILABLE">
                                                    Available
                                                </option>

                                                <option value="SOLD">
                                                    Sold
                                                </option>

                                                <option value="RENTED">
                                                    Rented
                                                </option>

                                            </select>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="property-actions">


                                            {/* EDIT */}

                                            <button
                                                className="edit-btn"

                                                onClick={() =>
                                                    navigate(
                                                        `/seller/edit/${property.id}`
                                                    )
                                                }
                                            >
                                                ✏ Edit
                                            </button>


                                            {/* DELETE */}

                                            <button
                                                className="delete-btn"

                                                onClick={() =>
                                                    handleDelete(
                                                        property.id
                                                    )
                                                }
                                            >
                                                🗑 Delete
                                            </button>


                                        </div>


                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}


export default MyProperties;