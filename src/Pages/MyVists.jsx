import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getVisits } from "../services/visitService";
import "../css/MyVisits.css";

function MyVisits() {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      const response = await getVisits(1); // Temporary user
      setVisits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Maps status string → CSS modifier class
  const statusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":  return "status-confirmed";
      case "cancelled":  return "status-cancelled";
      case "completed":  return "status-completed";
      default:           return "status-pending";
    }
  };

  return (
    <>
      <Navbar />

      <div className="visits-container">
        <h1>My Visits</h1>

        {visits.length === 0 ? (
          <p>No visits booked yet.</p>
        ) : (
          <div className="visits-list">
            {visits.map((visit) => (
              <div key={visit.id} className="visit-card">

                {/* Status badge — top right */}
                <span className={`visit-status ${statusClass(visit.status)}`}>
                  {visit.status}
                </span>

                {/* Property info */}
                <h2>{visit.property.title}</h2>
                <p className="visit-city">📍 {visit.property.city}</p>

                {/* Date / time / meta */}
                <div className="visit-meta">
                  <div className="visit-meta-item">
                    <span className="visit-meta-label">Date</span>
                    <span className="visit-meta-value">📅 {visit.visitDate}</span>
                  </div>
                  <div className="visit-meta-item">
                    <span className="visit-meta-label">Time</span>
                    <span className="visit-meta-value">🕐 {visit.visitTime}</span>
                  </div>
                </div>

                {/* Message */}
                {visit.message && (
                  <p className="visit-message">💬 {visit.message}</p>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyVisits;