import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/sellerbooking.css";

function SellerBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/payments/seller/bookings",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to load seller bookings:", error);
      setError("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const markAsSold = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/property/${propertyId}/status`,
        null,
        { params: { status: "SOLD" }, headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Property marked as SOLD successfully");
      fetchBookings();
    } catch (error) {
      alert(error.response?.data || "Unable to mark property as sold");
    }
  };

  if (loading) return <div className="seller-bookings-loading">Loading bookings…</div>;
  if (error)   return <div className="seller-bookings-error">{error}</div>;

  return (
    <div className="seller-bookings-page">
      <div className="seller-bookings-container">

        {/* Back */}
        <button
          className="seller-bookings-back"
          onClick={() => navigate("/seller/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="seller-bookings-header">
          <p className="seller-bookings-eyebrow">Seller</p>
          <h1>Bookings & Payments</h1>
          <p>View successful property bookings and payment details.</p>
        </div>

        {/* Empty */}
        {bookings.length === 0 ? (
          <div className="no-seller-bookings">
            <h2>No bookings yet</h2>
            <p>Successful property bookings will appear here.</p>
          </div>
        ) : (
          <div className="seller-bookings-list">
            {bookings.map((booking) => (
              <div className="seller-booking-card" key={booking.id}>

                {/* Image */}
                <div className="seller-booking-image">
                  {booking.propertyImage ? (
                    <img src={booking.propertyImage} alt={booking.propertyTitle} />
                  ) : (
                    <div className="no-property-image">No Image</div>
                  )}
                </div>

                {/* Details */}
                <div className="seller-booking-details">
                  <h2>{booking.propertyTitle}</h2>
                  <p>Buyer: <strong>{booking.buyerName}</strong></p>
                  <p>Amount: <strong>₹ {Number(booking.amount || 0).toLocaleString("en-IN")}</strong></p>
                  <p>Payment ID: <strong>{booking.paymentId || "—"}</strong></p>
                  <p>Order ID: <strong>{booking.orderId || "—"}</strong></p>
                </div>

                {/* Status + action */}
                <div className="seller-booking-actions">
                  <span className="seller-payment-success">Payment Success</span>
                  <span className="seller-property-booked">{booking.propertyStatus}</span>

                  {booking.propertyStatus === "BOOKED" && (
                    <button
                      className="mark-sold-btn"
                      type="button"
                      onClick={() => markAsSold(booking.propertyId)}
                    >
                      Mark as Sold
                    </button>
                  )}

                  {booking.propertyStatus === "SOLD" && (
                    <span className="seller-property-sold">Sold</span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default SellerBookings;