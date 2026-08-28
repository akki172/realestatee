import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/PaymentHistory.css";

function PaymentHistory() {

    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                "http://localhost:8080/api/payments/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPayments(response.data);

        } catch (error) {

            console.error(
                "Error loading payments:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                navigate("/login");
            }

        } finally {

            setLoading(false);

        }
    };


    const getStatusClass = (status) => {

        switch (status) {

            case "SUCCESS":
                return "payment-success";

            case "PENDING":
                return "payment-pending";

            case "FAILED":
                return "payment-failed";

            default:
                return "";

        }
    };


    const viewReceipt = (paymentId) => {

        navigate(
            `/payment/receipt/${paymentId}`
        );

    };


    if (loading) {

        return (
            <div className="payment-history-loading">
                Loading payment history...
            </div>
        );

    }


    return (

        <div className="payment-history-page">

            <div className="payment-history-container">

                <div className="payment-history-header">

                    <p className="payment-eyebrow">
                        TRANSACTIONS
                    </p>

                    <h1>
                        Payment History
                    </h1>

                    <p>
                        View your property payment
                        transactions and receipts.
                    </p>

                </div>


                {payments.length === 0 ? (

                    <div className="no-payments">

                        <h2>
                            No payments yet
                        </h2>

                        <p>
                            Your completed property
                            payments will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="payment-list">

                        {payments.map((payment) => (

                            <div
                                className="payment-card"
                                key={payment.id}
                            >
                                  <div className="payment-property-image">

        <img
            src={
                payment.propertyImage ||
                "https://placehold.co/300x200?text=Property"
            }
            alt={payment.propertyTitle}
        />

    </div>

                                
    <div className="payment-card-left">

        <h2>
            {payment.propertyTitle}
        </h2>

        <p>
            Order ID:
            <strong>
                {payment.orderId}
            </strong>
        </p>

        <p>
            Amount:
            <strong>
                ₹
                {Number(
                    payment.amount || 0
                ).toLocaleString("en-IN")}
            </strong>
        </p>

        <p>
            {payment.createdAt
                ? new Date(
                    payment.createdAt
                  ).toLocaleString("en-IN")
                : "N/A"}
        </p>

    </div>



                                <div className="payment-card-right">

        <span
            className={`payment-status ${getStatusClass(
                payment.status
            )}`}
        >
            {payment.status}
        </span>


        {payment.status === "SUCCESS" && (

            <button
                className="view-receipt-btn"
                onClick={() =>
                    viewReceipt(payment.id)
                }
            >
                View Receipt
            </button>

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

export default PaymentHistory;