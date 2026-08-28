import { useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import "../css/PaymentPage.css";

function PaymentPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const propertyId =
        new URLSearchParams(
            window.location.search
        ).get("propertyId");


    const startPayment = async () => {

        try {

            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("token");

            if (!token) {
                setError("Please login first.");
                return;
            }


            // =====================================
            // CREATE PAYMENT ORDER
            // =====================================

            const response = await axios.post(
                "http://localhost:8080/api/payments/create",
                {
                    propertyId: Number(propertyId)
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


            const paymentSessionId =
                response.data.paymentSessionId;


            if (!paymentSessionId) {

                throw new Error(
                    "Payment session was not created."
                );
            }


            // =====================================
            // LOAD CASHFREE
            // =====================================

            const cashfree =
                await load({
                    mode: "sandbox"
                });


            // =====================================
            // OPEN CHECKOUT
            // =====================================

            await cashfree.checkout({

                paymentSessionId:
                    paymentSessionId,

                redirectTarget:
                    "_self"

            });

        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            setError(
                error.response?.data ||
                error.message ||
                "Unable to start payment."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="payment-page">

            <h1>
                Complete Payment
            </h1>


            {error && (
                <p className="payment-error">
                    {error}
                </p>
            )}


            <button
                type="button"
                onClick={startPayment}
                disabled={loading}
            >

                {loading
                    ? "Opening Payment..."
                    : "Pay Now"}

            </button>

        </div>
    );
}

export default PaymentPage;