import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getSellerVisits,
    approveVisit,
    rejectVisit
} from "../services/visitService";
import "../css/VisitRequests.css";

function VisitRequests() {

    const [visits, setVisits] = useState([]);

    useEffect(() => {
        loadVisits();
    }, []);

    const loadVisits = async () => {

        try {

            const sellerId = localStorage.getItem("userId");

            const response = await getSellerVisits(sellerId);

            setVisits(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleApprove = async (id) => {

        try {

            const response = await approveVisit(id);

            alert(response.data);

            loadVisits();

        } catch (error) {

            console.log(error);

            alert("Unable to approve visit.");

        }

    };

    const handleReject = async (id) => {

        try {

            const response = await rejectVisit(id);

            alert(response.data);

            loadVisits();

        } catch (error) {

            console.log(error);

            alert("Unable to reject visit.");

        }

    };

    return (

        <>
            <Navbar />

            <div className="visit-container">

                <h1>Visit Requests</h1>

                {visits.length === 0 ? (

                    <p className="empty">
                        No visit requests available.
                    </p>

                ) : (

                    visits.map((visit) => (

                        <div
                            key={visit.id}
                            className="visit-card"
                        >

                            <h2>{visit.property.title}</h2>

                            <p>
                                <strong>Buyer :</strong>{" "}
                                {visit.buyer.fullName}
                            </p>

                            <p>
                                <strong>Email :</strong>{" "}
                                {visit.buyer.email}
                            </p>

                            <p>
                                <strong>Visit Date :</strong>{" "}
                                {visit.visitDate}
                            </p>

                            <p>
                                <strong>Visit Time :</strong>{" "}
                                {visit.visitTime}
                            </p>

                            <p>
                                <strong>Message :</strong>{" "}
                                {visit.message}
                            </p>

                            <p>
                                <strong>Status :</strong>{" "}
                                {visit.status}
                            </p>

                            {visit.status === "PENDING" && (

                                <div className="visit-buttons">

                                    <button
                                        className="approve-btn"
                                        onClick={() => handleApprove(visit.id)}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() => handleReject(visit.id)}
                                    >
                                        Reject
                                    </button>

                                </div>

                            )}

                        </div>

                    ))

                )}

            </div>

        </>

    );

}

export default VisitRequests;