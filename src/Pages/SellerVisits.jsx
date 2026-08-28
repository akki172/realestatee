import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SellerNavbar from "../components/SellerNavbar";

import {
    getSellerVisits,
    approveVisit,
    rejectVisit
} from "../services/visitService";

import "../css/SellerVisits.css";


function SellerVisits() {

    const navigate = useNavigate();

    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Decision popup
    const [showDecisionBox, setShowDecisionBox] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [decisionType, setDecisionType] = useState("");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);


    // =========================================
    // LOAD VISITS
    // =========================================

    useEffect(() => {
        loadVisits();
    }, []);


    const loadVisits = async () => {

        try {

            setLoading(true);
            setError("");

            const sellerId = Number(
                localStorage.getItem("userId")
            );

            const token = localStorage.getItem("token");

            if (!sellerId || !token) {

                setError("Please login again.");

                return;
            }

            const response =
                await getSellerVisits(sellerId);

            console.log(
                "Seller Visits:",
                response.data
            );

            setVisits(response.data);

        } catch (error) {

            console.error(
                "Error loading seller visits:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to load visit requests."
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // OPEN DECISION BOX
    // =========================================

    const openDecisionBox = (visit, type) => {

        setSelectedVisit(visit);
        setDecisionType(type);
        setComment("");
        setShowDecisionBox(true);
    };


    // =========================================
    // CLOSE DECISION BOX
    // =========================================

    const closeDecisionBox = () => {

        if (submitting) return;

        setShowDecisionBox(false);
        setSelectedVisit(null);
        setDecisionType("");
        setComment("");
    };


    // =========================================
    // SUBMIT DECISION
    // =========================================

    const handleDecision = async () => {

        if (!selectedVisit) {
            return;
        }


        // Reason required for rejection

        if (
            decisionType === "REJECT" &&
            comment.trim() === ""
        ) {

            alert(
                "Please enter a reason for rejection."
            );

            return;
        }


        try {

            setSubmitting(true);


            if (decisionType === "APPROVE") {

                await approveVisit(
                    selectedVisit.id,
                    comment
                );

                alert(
                    "Visit approved successfully."
                );

            } else {

                await rejectVisit(
                    selectedVisit.id,
                    comment
                );

                alert(
                    "Visit rejected successfully."
                );
            }


            closeDecisionBox();

            await loadVisits();


        } catch (error) {

            console.error(
                "Decision error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to process request."
            );

        } finally {

            setSubmitting(false);
        }
    };


    // =========================================
    // STATUS CLASS
    // =========================================

    const getStatusClass = (status) => {

        if (status === "APPROVED") {
            return "status-approved";
        }

        if (status === "REJECTED") {
            return "status-rejected";
        }

        return "status-pending";
    };


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <>

                <SellerNavbar />

                <div className="seller-visits-page">

                    <div className="visits-loading">

                        Loading visit requests...

                    </div>

                </div>

            </>

        );
    }


    // =========================================
    // MAIN PAGE
    // =========================================

    return (

        <>

            <SellerNavbar />


            <div className="seller-visits-page">

                <div className="seller-visits-container">


                    {/* =========================
                        BACK TO DASHBOARD
                    ========================= */}

                    <button
                        type="button"
                        className="visits-back"
                        onClick={() =>
                            navigate(
                                "/seller/dashboard"
                            )
                        }
                    >
                        ← Back to Dashboard
                    </button>


                    {/* =========================
                        HEADER
                    ========================= */}

                    <div className="visits-header">

                        <div>

                            <span className="visits-eyebrow">
                                SELLER
                            </span>

                            <h1>
                                Visit Requests
                            </h1>

                            <p>
                                Manage buyers who requested
                                property visits.
                            </p>

                        </div>


                        <div className="visit-count">

                            {visits.length} Requests

                        </div>

                    </div>


                    {/* =========================
                        ERROR
                    ========================= */}

                    {error && (

                        <div className="visits-error">

                            {error}

                        </div>

                    )}


                    {/* =========================
                        EMPTY
                    ========================= */}

                    {!error &&
                        visits.length === 0 && (

                            <div className="visits-empty">

                                <div className="empty-icon">
                                    📅
                                </div>

                                <h2>
                                    No Visit Requests
                                </h2>

                                <p>
                                    You don't have any property
                                    visit requests yet.
                                </p>

                            </div>

                        )}


                    {/* =========================
                        VISITS
                    ========================= */}

                    <div className="visits-list">

                        {visits.map((visit) => (

                            <div
                                className="visit-card"
                                key={visit.id}
                            >


                                {/* PROPERTY */}

                                <div className="visit-card-top">

                                    <div>

                                        <span className="property-label">
                                            PROPERTY
                                        </span>

                                        <h2>
                                            {visit.property?.title ||
                                                "Property"}
                                        </h2>

                                        <p className="property-location">

                                            📍{" "}

                                            {visit.property?.city ||
                                                ""}

                                            {visit.property?.state
                                                ? `, ${visit.property.state}`
                                                : ""}

                                        </p>

                                    </div>


                                    <span
                                        className={`visit-status ${getStatusClass(
                                            visit.status
                                        )}`}
                                    >
                                        {visit.status}
                                    </span>

                                </div>


                                {/* BUYER + VISIT INFORMATION */}

                                <div className="visit-details">


                                    {/* BUYER */}

                                    <div className="visit-detail">

                                        <span>
                                            BUYER
                                        </span>

                                        <strong>
                                            {visit.buyer?.fullName ||
                                                "Unknown Buyer"}
                                        </strong>

                                    </div>


                                    {/* EMAIL */}

                                    <div className="visit-detail">

                                        <span>
                                            EMAIL
                                        </span>

                                        <strong>
                                            {visit.buyer?.email ||
                                                "No email"}
                                        </strong>

                                    </div>


                                    {/* DATE */}

                                    <div className="visit-detail">

                                        <span>
                                            VISIT DATE
                                        </span>

                                        <strong>
                                            {visit.visitDate ||
                                                "Not specified"}
                                        </strong>

                                    </div>


                                    {/* TIME */}

                                    <div className="visit-detail">

                                        <span>
                                            VISIT TIME
                                        </span>

                                        <strong>
                                            {visit.visitTime ||
                                                "Not specified"}
                                        </strong>

                                    </div>

                                </div>


                                {/* BUYER MESSAGE */}

                                {visit.message && (

                                    <div className="visit-message">

                                        <span>
                                            BUYER MESSAGE
                                        </span>

                                        <p>
                                            {visit.message}
                                        </p>

                                    </div>

                                )}


                                {/* PENDING ACTIONS */}

                                {visit.status === "PENDING" && (

                                    <div className="visit-actions">

                                        <button
                                            type="button"
                                            className="approve-btn"
                                            onClick={() =>
                                                openDecisionBox(
                                                    visit,
                                                    "APPROVE"
                                                )
                                            }
                                        >
                                            ✓ Approve Visit
                                        </button>


                                        <button
                                            type="button"
                                            className="reject-btn"
                                            onClick={() =>
                                                openDecisionBox(
                                                    visit,
                                                    "REJECT"
                                                )
                                            }
                                        >
                                            ✕ Reject Visit
                                        </button>

                                    </div>

                                )}


                                {/* APPROVED */}

                                {visit.status === "APPROVED" && (

                                    <div className="decision-message approved-message">

                                        ✓ You approved this visit.

                                    </div>

                                )}


                                {/* REJECTED */}

                                {visit.status === "REJECTED" && (

                                    <div className="decision-message rejected-message">

                                        ✕ You rejected this visit.

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </div>


            {/* =========================================
                DECISION MODAL
            ========================================= */}

            {showDecisionBox &&
                selectedVisit && (

                    <div className="decision-overlay">

                        <div className="decision-modal">


                            {/* CLOSE */}

                            <button
                                type="button"
                                className="modal-close"
                                onClick={closeDecisionBox}
                                disabled={submitting}
                            >
                                ×
                            </button>


                            {/* TITLE */}

                            <span className="modal-eyebrow">

                                {decisionType === "APPROVE"
                                    ? "APPROVE VISIT"
                                    : "REJECT VISIT"}

                            </span>


                            <h2>

                                {decisionType === "APPROVE"
                                    ? "Approve this visit?"
                                    : "Reject this visit?"}

                            </h2>


                            {/* PROPERTY */}

                            <p className="modal-property">

                                {selectedVisit.property?.title}

                            </p>


                            {/* BUYER */}

                            <p className="modal-buyer">

                                Buyer:{" "}

                                <strong>
                                    {selectedVisit.buyer?.fullName}
                                </strong>

                            </p>


                            {/* COMMENT LABEL */}

                            <label className="comment-label">

                                {decisionType === "APPROVE"
                                    ? "Message to buyer"
                                    : "Reason for rejection *"}

                            </label>


                            {/* COMMENT */}

                            <textarea
                                value={comment}
                                onChange={(e) =>
                                    setComment(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    decisionType === "APPROVE"
                                        ? "Add a message for the buyer (optional)..."
                                        : "Please enter the reason for rejecting this visit..."
                                }
                                rows="5"
                                disabled={submitting}
                            />


                            {/* ACTIONS */}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="modal-cancel"
                                    onClick={closeDecisionBox}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    className={
                                        decisionType === "APPROVE"
                                            ? "modal-approve"
                                            : "modal-reject"
                                    }
                                    onClick={handleDecision}
                                    disabled={submitting}
                                >

                                    {submitting
                                        ? "Sending..."
                                        : decisionType === "APPROVE"
                                            ? "✓ Approve & Send"
                                            : "✕ Reject & Send"}

                                </button>

                            </div>

                        </div>

                    </div>

                )}

        </>
    );
}


export default SellerVisits;