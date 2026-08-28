import { useEffect, useState } from "react";
import axios from "axios";
import "../css/BuyerPreferences.css";

const API = "http://localhost:8080/api/buyer-preference";

function BuyerPreferences() {

    const [preference, setPreference] = useState({
        purpose: "BUY",
        city: "",
        propertyType: "APARTMENT",
        minPrice: "",
        maxPrice: "",
        latitude: "",
        longitude: "",
        radius: 10
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadPreference();
    }, []);

    const getHeaders = () => {

        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };


    const loadPreference = async () => {

        try {

            const buyerId =
                localStorage.getItem("userId");

            if (!buyerId) return;

            const response = await axios.get(
                `${API}/${buyerId}`,
                getHeaders()
            );

            if (response.data) {

                setPreference({
                    purpose:
                        response.data.purpose || "BUY",

                    city:
                        response.data.city || "",

                    propertyType:
                        response.data.propertyType ||
                        "APARTMENT",

                    minPrice:
                        response.data.minPrice || "",

                    maxPrice:
                        response.data.maxPrice || "",

                    latitude:
                        response.data.latitude || "",

                    longitude:
                        response.data.longitude || "",

                    radius:
                        response.data.radius || 10
                });

            }

        } catch (error) {

            // 404 simply means the buyer
            // has not saved preferences yet.

            if (error.response?.status !== 404) {

                console.error(
                    "Error loading preferences:",
                    error
                );

            }

        }
    };


    const handleChange = (e) => {

        setPreference({
            ...preference,
            [e.target.name]: e.target.value
        });

    };


    const handleSave = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setMessage("");

            const buyerId =
                Number(
                    localStorage.getItem("userId")
                );

            const requestData = {

                buyerId,

                purpose:
                    preference.purpose,

                city:
                    preference.city,

                propertyType:
                    preference.propertyType,

                minPrice:
                    preference.minPrice === ""
                        ? null
                        : Number(preference.minPrice),

                maxPrice:
                    preference.maxPrice === ""
                        ? null
                        : Number(preference.maxPrice),

                latitude:
                    preference.latitude === ""
                        ? null
                        : Number(preference.latitude),

                longitude:
                    preference.longitude === ""
                        ? null
                        : Number(preference.longitude),

                radius:
                    Number(preference.radius)
            };


            await axios.post(
                `${API}/save`,
                requestData,
                getHeaders()
            );


            setMessage(
                "Preferences saved successfully."
            );

        } catch (error) {

            console.error(
                "Error saving preferences:",
                error
            );

            setMessage(
                error.response?.data ||
                "Failed to save preferences."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="buyer-preferences">

            <div className="buyer-preferences-header">

                <span>
                    PROPERTY SEARCH
                </span>

                <h2>
                    Property Preferences
                </h2>

                <p>
                    Tell us what type of property
                    you are looking for.
                </p>

            </div>


            <form
                className="buyer-preferences-form"
                onSubmit={handleSave}
            >


                {/* PURPOSE */}

                <div className="preference-field">

                    <label>
                        Looking For
                    </label>

                    <select
                        name="purpose"
                        value={preference.purpose}
                        onChange={handleChange}
                    >

                        <option value="BUY">
                            Buy a Property
                        </option>

                        <option value="RENT">
                            Rent a Property
                        </option>

                    </select>

                </div>


                {/* CITY */}

                <div className="preference-field">

                    <label>
                        Preferred City
                    </label>

                    <input
                        type="text"
                        name="city"
                        placeholder="e.g. Hyderabad"
                        value={preference.city}
                        onChange={handleChange}
                    />

                </div>


                {/* PROPERTY TYPE */}

                <div className="preference-field">

                    <label>
                        Property Type
                    </label>

                    <select
                        name="propertyType"
                        value={preference.propertyType}
                        onChange={handleChange}
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


                {/* BUDGET */}

                <div className="preference-row">

                    <div className="preference-field">

                        <label>
                            Minimum Budget
                        </label>

                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Minimum"
                            value={preference.minPrice}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="preference-field">

                        <label>
                            Maximum Budget
                        </label>

                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Maximum"
                            value={preference.maxPrice}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                {/* RADIUS */}

                <div className="preference-field">

                    <label>
                        Search Radius
                    </label>

                    <select
                        name="radius"
                        value={preference.radius}
                        onChange={handleChange}
                    >

                        <option value="5">
                            Within 5 km
                        </option>

                        <option value="10">
                            Within 10 km
                        </option>

                        <option value="20">
                            Within 20 km
                        </option>

                        <option value="50">
                            Within 50 km
                        </option>

                    </select>

                </div>


                {/* SAVE */}

                <button
                    type="submit"
                    className="save-preferences-btn"
                    disabled={loading}
                >

                    {loading
                        ? "Saving..."
                        : "Save Preferences"}

                </button>


                {/* MESSAGE */}

                {message && (

                    <p className="preference-message">

                        {message}

                    </p>

                )}

            </form>

        </div>

    );

}

export default BuyerPreferences;