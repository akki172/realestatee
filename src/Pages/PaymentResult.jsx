import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentResult() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("VERIFYING");
    const [payment, setPayment] = useState(null);

    useEffect(() => {

        const orderId =
            searchParams.get("order_id");

        if (!orderId) {
            setStatus("FAILED");
            return;
        }

        verifyPayment(orderId);

    }, [searchParams]);


    const verifyPayment = async (orderId) => {

        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/api/payments/verify/${orderId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setPayment(response.data);

            if (
                response.data.status === "SUCCESS"
            ) {

                setStatus("SUCCESS");

            } else if (
                response.data.status === "FAILED"
            ) {

                setStatus("FAILED");

            } else {

                setStatus("PENDING");

            }

        } catch (error) {

            console.error(
                "Payment verification error:",
                error
            );

            setStatus("FAILED");
        }
    };


    if (status === "VERIFYING") {

        return (
            <div className="payment-result">
                <h1>
                    Verifying Payment...
                </h1>

                <p>
                    Please wait while we confirm
                    your payment.
                </p>
            </div>
        );
    }


    if (status === "SUCCESS") {

        return (
            <div className="payment-result">

                <div className="success-icon">
                    ✓
                </div>

                <h1>
                    Payment Successful
                </h1>

                <p>
                    Your payment has been
                    successfully confirmed.
                </p>

                {payment && (
                    <div>

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
                                    payment.amount
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </strong>
                        </p>

                    </div>
                )}

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Go to Dashboard
                </button>

            </div>
        );
    }


    if (status === "PENDING") {

        return (
            <div className="payment-result">

                <h1>
                    Payment Pending
                </h1>

                <p>
                    We haven't received final
                    confirmation yet.
                </p>

                <button
                    onClick={() =>
                        window.location.reload()
                    }
                >
                    Check Again
                </button>

            </div>
        );
    }


    return (
        <div className="payment-result">

            <h1>
                Payment Failed
            </h1>

            <p>
                We could not confirm your payment.
            </p>

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
            >
                Back to Dashboard
            </button>

        </div>
    );
}

export default PaymentResult;