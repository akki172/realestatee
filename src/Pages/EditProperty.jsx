import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";

import { getPropertyById, updateProperty } from "../services/PropertyService";

import "../css/EditProperty.css";


function EditProperty() {

    const { id } = useParams();

    const navigate = useNavigate();


    // ================================
    // IMAGE URL
    // ================================

    const [imageUrlInput, setImageUrlInput] = useState("");


    // ================================
    // PROPERTY STATE
    // ================================

    const [property, setProperty] = useState({

        title: "",

        description: "",

        propertyType: "APARTMENT",

        // IMPORTANT
        listingType: "SALE",

        price: "",

        area: "",

        bedrooms: "",

        bathrooms: "",

        balconies: "",

        parking: "",

        furnished: "",

        floor: "",

        totalFloors: "",

        ageOfProperty: "",

        address: "",

        city: "",

        state: "",

        pincode: "",

        latitude: "",

        longitude: "",

        imageUrls: []

    });


    // ================================
    // NEW IMAGES
    // ================================

    const [newImages, setNewImages] = useState([]);


    // ================================
    // STATES
    // ================================

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");


    // ================================
    // LOAD PROPERTY
    // ================================

    useEffect(() => {

        loadProperty();

    }, [id]);


    const loadProperty = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getPropertyById(id);

            const data = response.data;


            setProperty({

                title:
                    data.title || "",

                description:
                    data.description || "",

                propertyType:
                    data.propertyType || "APARTMENT",


                // IMPORTANT
                // Fixes listingType null problem
                listingType:
                    data.listingType || "SALE",


                price:
                    data.price ?? "",

                area:
                    data.area ?? "",

                bedrooms:
                    data.bedrooms ?? "",

                bathrooms:
                    data.bathrooms ?? "",

                balconies:
                    data.balconies ?? "",

                parking:
                    data.parking ?? "",

                furnished:
                    data.furnished || "",

                floor:
                    data.floor ?? "",

                totalFloors:
                    data.totalFloors ?? "",

                ageOfProperty:
                    data.ageOfProperty ?? "",

                address:
                    data.address || "",

                city:
                    data.city || "",

                state:
                    data.state || "",

                pincode:
                    data.pincode || "",

                latitude:
                    data.latitude ?? "",

                longitude:
                    data.longitude ?? "",


                // Existing images
                imageUrls:
                    data.imageUrls || []

            });


        } catch (error) {

            console.error(
                "Error loading property:",
                error
            );


            if (
                error.response?.status === 403
            ) {

                setError(
                    "You are not authorized to edit this property."
                );

            } else if (
                error.response?.status === 404
            ) {

                setError(
                    "Property not found."
                );

            } else {

                setError(
                    "Unable to load property."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ================================
    // HANDLE INPUT
    // ================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setProperty((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // ================================
    // SELECT NEW IMAGES
    // ================================

    const handleImageSelect = (e) => {

        const files =
            Array.from(e.target.files);


        setNewImages((previous) => [

            ...previous,

            ...files

        ]);

    };


    // ================================
    // REMOVE EXISTING IMAGE
    // ================================

    const removeExistingImage = (index) => {

        setProperty((previous) => ({

            ...previous,

            imageUrls:
                previous.imageUrls.filter(
                    (_, imageIndex) =>
                        imageIndex !== index
                )

        }));

    };


    // ================================
    // REMOVE NEW IMAGE
    // ================================

    const removeNewImage = (index) => {

        setNewImages((previous) =>

            previous.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            )

        );

    };


    // ================================
    // UPLOAD IMAGES TO CLOUDINARY
    // ================================

    const uploadImagesToCloudinary =
        async () => {

            if (newImages.length === 0) {

                return [];

            }


            setUploading(true);


            try {

                const cloudName =
                    import.meta.env
                        .VITE_CLOUDINARY_CLOUD_NAME;


                const uploadPreset =
                    import.meta.env
                        .VITE_CLOUDINARY_UPLOAD_PRESET;


                if (
                    !cloudName ||
                    !uploadPreset
                ) {

                    throw new Error(
                        "Cloudinary configuration is missing."
                    );

                }


                const uploadedUrls = [];


                for (
                    const image of newImages
                ) {

                    const formData =
                        new FormData();


                    formData.append(
                        "file",
                        image
                    );


                    formData.append(
                        "upload_preset",
                        uploadPreset
                    );


                    const response =
                        await fetch(

                            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

                            {
                                method: "POST",

                                body: formData
                            }

                        );


                    if (!response.ok) {

                        throw new Error(
                            "Image upload failed."
                        );

                    }


                    const data =
                        await response.json();


                    uploadedUrls.push(
                        data.secure_url
                    );

                }


                return uploadedUrls;


            } finally {

                setUploading(false);

            }

        };


    // ================================
    // UPDATE PROPERTY
    // ================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setSaving(true);

            setError("");


            // Upload newly selected images
            const uploadedUrls =
                await uploadImagesToCloudinary();


            // Existing URLs + new Cloudinary URLs
            const finalImageUrls = [

                ...property.imageUrls,

                ...uploadedUrls

            ];


            // ============================
            // DATA SENT TO BACKEND
            // ============================

            const data = {

                title:
                    property.title,

                description:
                    property.description,

                propertyType:
                    property.propertyType,


                // IMPORTANT
                // This fixes your NullPointerException
                listingType:
                    property.listingType,


                price:
                    property.price === ""
                        ? null
                        : Number(property.price),


                area:
                    property.area === ""
                        ? null
                        : Number(property.area),


                bedrooms:
                    property.bedrooms === ""
                        ? null
                        : Number(property.bedrooms),


                bathrooms:
                    property.bathrooms === ""
                        ? null
                        : Number(property.bathrooms),


                balconies:
                    property.balconies === ""
                        ? null
                        : Number(property.balconies),


                parking:
                    property.parking === ""
                        ? null
                        : Number(property.parking),


                furnished:
                    property.furnished,


                floor:
                    property.floor === ""
                        ? null
                        : Number(property.floor),


                totalFloors:
                    property.totalFloors === ""
                        ? null
                        : Number(property.totalFloors),


                ageOfProperty:
                    property.ageOfProperty === ""
                        ? null
                        : Number(
                            property.ageOfProperty
                        ),


                address:
                    property.address,

                city:
                    property.city,

                state:
                    property.state,

                pincode:
                    property.pincode,


                latitude:
                    property.latitude === ""
                        ? null
                        : Number(
                            property.latitude
                        ),


                longitude:
                    property.longitude === ""
                        ? null
                        : Number(
                            property.longitude
                        ),


                // IMPORTANT
                // Existing + new + URL images
                imageUrls:
                    finalImageUrls

            };


            console.log(
                "Updating property:",
                data
            );


            // ============================
            // PUT REQUEST
            // ============================

            const response =
                await updateProperty(
                    id,
                    data
                );


            console.log(
                "Update response:",
                response.data
            );


            alert(
                response.data ||
                "Property Updated Successfully"
            );


            navigate(
                "/seller/properties"
            );


        } catch (error) {

            console.error(
                "Update property error:",
                error
            );


            setError(

                error.response?.data?.message ||

                error.response?.data ||

                error.message ||

                "Failed to update property."

            );


        } finally {

            setSaving(false);

        }

    };


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="edit-property-page">

                    <p className="edit-loading">
                        Loading property...
                    </p>

                </div>

            </>

        );

    }


    // ================================
    // ERROR
    // ================================

    if (
        error &&
        !property.title
    ) {

        return (

            <>

                <Navbar />

                <div className="edit-property-page">

                    <div className="edit-error-card">

                        <h2>
                            {error}
                        </h2>


                        <button
                            onClick={() =>
                                navigate(
                                    "/seller/properties"
                                )
                            }
                        >
                            Back to My Properties
                        </button>

                    </div>

                </div>

            </>

        );

    }


    // ================================
    // FORM
    // ================================

    return (

        <>

            <Navbar />


            <div className="edit-property-page">

                <div className="edit-property-container">


                    <button
                        className="edit-back"
                        onClick={() =>
                            navigate(
                                "/seller/properties"
                            )
                        }
                    >
                        ← Back to My Properties
                    </button>


                    <div className="edit-heading">

                        <span>
                            SELLER
                        </span>

                        <h1>
                            Edit Property
                        </h1>

                        <p>
                            Update your property information
                            and save the changes.
                        </p>

                    </div>


                    {error && (

                        <div className="edit-form-error">

                            {error}

                        </div>

                    )}


                    <form
                        className="edit-property-form"
                        onSubmit={handleSubmit}
                    >


                        {/* ============================
                            IMAGE URL
                        ============================ */}

                        <div className="image-url-box">

                            <label>
                                🔗 Or add image URL
                            </label>


                            <div className="image-url-row">

                                <input
                                    type="url"
                                    placeholder="https://example.com/property-image.jpg"
                                    value={
                                        imageUrlInput
                                    }
                                    onChange={(e) =>
                                        setImageUrlInput(
                                            e.target.value
                                        )
                                    }
                                />


                                <button
                                    type="button"
                                    onClick={() => {

                                        if (
                                            !imageUrlInput.trim()
                                        ) {

                                            alert(
                                                "Please enter an image URL."
                                            );

                                            return;

                                        }


                                        setProperty(
                                            (previous) => ({

                                                ...previous,

                                                imageUrls: [

                                                    ...previous.imageUrls,

                                                    imageUrlInput.trim()

                                                ]

                                            })

                                        );


                                        setImageUrlInput("");

                                    }}
                                >
                                    Add URL
                                </button>

                            </div>

                        </div>


                        {/* ============================
                            IMAGES
                        ============================ */}

                        <div className="edit-section">

                            <h2>
                                Property Images
                            </h2>


                            <p className="image-help">
                                Manage existing images or
                                upload new property images.
                            </p>


                            {/* EXISTING IMAGES */}

                            {property.imageUrls.length > 0 && (

                                <div className="edit-image-grid">

                                    {property.imageUrls.map(
                                        (image, index) => (

                                            <div
                                                className="edit-image-card"
                                                key={index}
                                            >

                                                <img
                                                    src={image}
                                                    alt={
                                                        `Property ${index + 1}`
                                                    }
                                                />


                                                <button
                                                    type="button"
                                                    className="remove-image-btn"
                                                    onClick={() =>
                                                        removeExistingImage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    ✕ Remove
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}


                            {/* UPLOAD */}

                            <div className="image-upload-box">

                                <label
                                    htmlFor="propertyImages"
                                    className="image-upload-label"
                                >
                                    📷 Upload New Images
                                </label>


                                <input
                                    id="propertyImages"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={
                                        handleImageSelect
                                    }
                                />


                                <p>
                                    Select one or more
                                    property images.
                                </p>

                            </div>


                            {/* NEW IMAGE PREVIEW */}

                            {newImages.length > 0 && (

                                <div className="edit-image-grid">

                                    {newImages.map(
                                        (image, index) => (

                                            <div
                                                className="edit-image-card"
                                                key={index}
                                            >

                                                <img
                                                    src={
                                                        URL.createObjectURL(
                                                            image
                                                        )
                                                    }
                                                    alt={
                                                        `New ${index + 1}`
                                                    }
                                                />


                                                <button
                                                    type="button"
                                                    className="remove-image-btn"
                                                    onClick={() =>
                                                        removeNewImage(
                                                            index
                                                        )
                                                    }
                                                >
                                                    ✕ Remove
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>


                        {/* ============================
                            BASIC INFORMATION
                        ============================ */}

                        <div className="edit-section">

                            <h2>
                                Basic Information
                            </h2>


                            <div className="edit-grid">


                                {/* TITLE */}

                                <div className="edit-field full">

                                    <label>
                                        Property Title
                                    </label>

                                    <input
                                        name="title"
                                        value={
                                            property.title
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="edit-field full">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={
                                            property.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        rows="5"
                                        required
                                    />

                                </div>


                                {/* PROPERTY TYPE */}

                                <div className="edit-field">

                                    <label>
                                        Property Type
                                    </label>

                                    <select
                                        name="propertyType"
                                        value={
                                            property.propertyType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="APARTMENT">
                                            Apartment
                                        </option>

                                        <option value="VILLA">
                                            Villa
                                        </option>

                                        <option value="HOUSE">
                                            House
                                        </option>

                                        <option value="PLOT">
                                            Plot
                                        </option>

                                    </select>

                                </div>


                                {/* LISTING TYPE */}

                                <div className="edit-field">

                                    <label>
                                        Listing Type
                                    </label>

                                    <select
                                        name="listingType"
                                        value={
                                            property.listingType
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="SALE">
                                            Sell Property
                                        </option>

                                        <option value="RENT">
                                            Rent Property
                                        </option>

                                    </select>

                                </div>


                                {/* FURNISHED */}

                                <div className="edit-field">

                                    <label>
                                        Furnished
                                    </label>

                                    <input
                                        name="furnished"
                                        value={
                                            property.furnished
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Furnished / Semi-Furnished"
                                    />

                                </div>


                            </div>

                        </div>


                        {/* ============================
                            PROPERTY DETAILS
                        ============================ */}

                        <div className="edit-section">

                            <h2>
                                Property Details
                            </h2>


                            <div className="edit-grid">


                                <div className="edit-field">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        name="price"
                                        type="number"
                                        value={
                                            property.price
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Area (sq.ft)
                                    </label>

                                    <input
                                        name="area"
                                        type="number"
                                        value={
                                            property.area
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Bedrooms
                                    </label>

                                    <input
                                        name="bedrooms"
                                        type="number"
                                        value={
                                            property.bedrooms
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Bathrooms
                                    </label>

                                    <input
                                        name="bathrooms"
                                        type="number"
                                        value={
                                            property.bathrooms
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Balconies
                                    </label>

                                    <input
                                        name="balconies"
                                        type="number"
                                        value={
                                            property.balconies
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Parking
                                    </label>

                                    <input
                                        name="parking"
                                        type="number"
                                        value={
                                            property.parking
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Floor
                                    </label>

                                    <input
                                        name="floor"
                                        type="number"
                                        value={
                                            property.floor
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Total Floors
                                    </label>

                                    <input
                                        name="totalFloors"
                                        type="number"
                                        value={
                                            property.totalFloors
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Age of Property
                                    </label>

                                    <input
                                        name="ageOfProperty"
                                        type="number"
                                        value={
                                            property.ageOfProperty
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ============================
                            LOCATION
                        ============================ */}

                        <div className="edit-section">

                            <h2>
                                Location
                            </h2>


                            <div className="edit-grid">


                                <div className="edit-field full">

                                    <label>
                                        Address
                                    </label>

                                    <input
                                        name="address"
                                        value={
                                            property.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        City
                                    </label>

                                    <input
                                        name="city"
                                        value={
                                            property.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        State
                                    </label>

                                    <input
                                        name="state"
                                        value={
                                            property.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Pincode
                                    </label>

                                    <input
                                        name="pincode"
                                        value={
                                            property.pincode
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Latitude
                                    </label>

                                    <input
                                        name="latitude"
                                        type="number"
                                        step="any"
                                        value={
                                            property.latitude
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="edit-field">

                                    <label>
                                        Longitude
                                    </label>

                                    <input
                                        name="longitude"
                                        type="number"
                                        step="any"
                                        value={
                                            property.longitude
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ============================
                            ACTIONS
                        ============================ */}

                        <div className="edit-actions">

                            <button
                                type="button"
                                className="edit-cancel"
                                onClick={() =>
                                    navigate(
                                        "/seller/properties"
                                    )
                                }
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="edit-save"
                                disabled={
                                    saving ||
                                    uploading
                                }
                            >

                                {uploading

                                    ? "Uploading Images..."

                                    : saving

                                        ? "Saving..."

                                        : "Save Changes"

                                }

                            </button>

                        </div>


                    </form>

                </div>

            </div>

        </>

    );

}


export default EditProperty;