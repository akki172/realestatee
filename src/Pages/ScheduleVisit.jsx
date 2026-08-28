import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ScheduleVisit.css";

function ScheduleVisit() {

    const navigate = useNavigate();
    const location = useLocation();

    const property = location.state?.property;

    const [visitDate, setVisitDate] = useState("");
    const [visitTime, setVisitTime] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const token = localStorage.getItem("token");
        const userId = Number(localStorage.getItem("userId"));

        if (!token) {
            navigate("/login");
            return;
        }

        if (!userId) {
            setError("User information not found. Please login again.");
            return;
        }

        if (!property?.id) {
            setError("Property information not found.");
            return;
        }

        if (!visitDate || !visitTime) {
            setError("Please select a date and time.");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:8080/api/visit/book",
                {
                    buyerId: userId,
                    propertyId: property.id,
                    visitDate: visitDate,
                    visitTime: visitTime,
                    message: message
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(
                "Visit booked:",
                response.data
            );

            alert("Visit request submitted successfully!");

            navigate(`/property/${property.id}`);

        } catch (error) {

            console.error(
                "Book visit error:",
                error
            );

            if (error.response?.status === 401) {

                setError(
                    "Your session has expired. Please login again."
                );

            } else if (error.response?.status === 403) {

                setError(
                    "You are not authorized to book this visit."
                );

            } else {

                setError(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to book visit."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    if (!property) {

        return (

            <div className="schedule-page">

                <div className="schedule-error-card">

                    <h2>
                        Property information not found
                    </h2>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Properties
                    </button>

                </div>

            </div>

        );
    }


    return (

        <div className="schedule-page">

            <div className="schedule-container">

                {/* Back */}

                <button
                    className="schedule-back"
                    onClick={() =>
                        navigate(`/property/${property.id}`)
                    }
                >
                    ← Back to Property
                </button>


                <div className="schedule-layout">

                    {/* Property Preview */}

                    <div className="schedule-property">

                        <img
                            src={
                                property.imageUrl ||
                                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                            }
                            alt={property.title}
                        />

                        <div className="schedule-property-info">

                            <span className="schedule-property-type">
                                {property.propertyType}
                            </span>

                            <h1>
                                {property.title}
                            </h1>

                            <p>
                                📍 {property.city}
                                {property.state
                                    ? `, ${property.state}`
                                    : ""}
                            </p>

                            <strong>
                                ₹{" "}
                                {Number(
                                    property.price || 0
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>

                    </div>


                    {/* Schedule Form */}

                    <div className="schedule-card">

                        <div className="schedule-heading">

                            <span>
                                VISIT REQUEST
                            </span>

                            <h2>
                                Schedule a Visit
                            </h2>

                            <p>
                                Choose a convenient date and
                                time to visit this property.
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="schedule-form"
                        >

                            {/* Date */}

                            <div className="schedule-field">

                                <label>
                                    Visit Date
                                </label>

                                <input
                                    type="date"
                                    value={visitDate}
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    onChange={(e) =>
                                        setVisitDate(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* Time */}

                            <div className="schedule-field">

                                <label>
                                    Preferred Time
                                </label>

                                <input
                                    type="time"
                                    value={visitTime}
                                    onChange={(e) =>
                                        setVisitTime(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* Message */}

                            <div className="schedule-field">

                                <label>
                                    Message
                                </label>

                                <textarea
                                    placeholder="Add a message for the seller (optional)"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    rows="5"
                                />

                            </div>


                            {/* Error */}

                            {error && (

                                <div className="schedule-error">
                                    {error}
                                </div>

                            )}


                            {/* Submit */}

                            <button
                                type="submit"
                                className="schedule-submit"
                                disabled={loading}
                            >
                                {loading
                                    ? "Booking..."
                                    : "Confirm Visit Request"}
                            </button>

                        </form>


                        <p className="schedule-note">
                            Your request will be sent to the
                            seller for approval.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ScheduleVisit;