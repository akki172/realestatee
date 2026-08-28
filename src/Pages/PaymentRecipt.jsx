import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/PaymentRecipt.css";

function PaymentReceipt() {

    const { paymentId } = useParams();
    const navigate = useNavigate();

    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReceipt();
    }, [paymentId]);


    const loadReceipt = async () => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/api/payments/${paymentId}/receipt`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setReceipt(response.data);

        } catch (error) {

            console.error(
                "Receipt loading error:",
                error
            );

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                navigate("/login");
                return;
            }

            alert(
                error.response?.data ||
                "Unable to load receipt."
            );

        } finally {

            setLoading(false);

        }
    };


    if (loading) {

        return (
            <div className="receipt-loading">
                Loading receipt...
            </div>
        );

    }


    if (!receipt) {

        return (
            <div className="receipt-error">
                Receipt not available.
            </div>
        );

    }


    const paymentDate =
        receipt.paymentDate
            ? new Date(
                receipt.paymentDate
              ).toLocaleString("en-IN")
            : "N/A";


    return (

        <div className="receipt-page">

            <div className="receipt-container">

                {/* ================= HEADER ================= */}

                <div className="receipt-header">

                    <div className="receipt-logo">
                        DOM<b>LEA</b>
                    </div>

                    <div className="receipt-title">
                        TRANSACTION RECEIPT
                    </div>

                    <div className="receipt-success">
                        ✓ PAYMENT SUCCESSFUL
                    </div>

                </div>


                {/* ================= TRANSACTION ================= */}

                <section className="receipt-section">

                    <h2>
                        Transaction Details
                    </h2>

                    <div className="receipt-grid">

                        <div>
                            <span>
                                Transaction ID
                            </span>

                            <strong>
                                {receipt.transactionId}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Order ID
                            </span>

                            <strong>
                                {receipt.orderId}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Payment ID
                            </span>

                            <strong>
                                {receipt.paymentId || "N/A"}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Payment Date
                            </span>

                            <strong>
                                {paymentDate}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ================= BUYER ================= */}

                <section className="receipt-section">

                    <h2>
                        Buyer Details
                    </h2>

                    <div className="receipt-grid">

                        <div>
                            <span>
                                Name
                            </span>

                            <strong>
                                {receipt.buyerName}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Email
                            </span>

                            <strong>
                                {receipt.buyerEmail}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Phone
                            </span>

                            <strong>
                                {receipt.buyerPhone ||
                                    "N/A"}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ================= PROPERTY ================= */}

                <section className="receipt-section">

                    <h2>
                        Property Details
                    </h2>

                    <div className="receipt-grid">

                        <div>
                            <span>
                                Property ID
                            </span>

                            <strong>
                                {receipt.propertyId}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Property
                            </span>

                            <strong>
                                {receipt.propertyTitle}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Location
                            </span>

                            <strong>
                                {receipt.city}
                                {receipt.state
                                    ? `, ${receipt.state}`
                                    : ""}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ================= AMOUNT ================= */}

                <div className="receipt-total">

                    <span>
                        Amount Paid
                    </span>

                    <strong>
                        ₹
                        {Number(
                            receipt.amount || 0
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                {/* ================= ACTIONS ================= */}

                <div className="receipt-actions">

                    <button
                        onClick={() =>
                            navigate(
                                "/payment-history"
                            )
                        }
                    >
                        Back to Payments
                    </button>

                    <button
                        className="download-receipt-btn"
                        onClick={async () => {

    try {

        const token =
            localStorage.getItem("token");

        const response = await axios.get(
            `http://localhost:8080/api/payments/${paymentId}/receipt/pdf`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                },
                responseType: "blob"
            }
        );

        const url =
            window.URL.createObjectURL(
                new Blob(
                    [response.data],
                    {
                        type: "application/pdf"
                    }
                )
            );

        const link =
            document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            `DOMLEA-Receipt-${paymentId}.pdf`
        );

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error(
            "Receipt download error:",
            error
        );

        alert(
            "Unable to download receipt."
        );
    }
}}
                    >
                        Download Receipt
                    </button>

                </div>


                <p className="receipt-footer">
                    Thank you for using DOMLEA.
                    This receipt confirms your
                    successful payment.
                </p>

            </div>

        </div>

    );
}

export default PaymentReceipt;