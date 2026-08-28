import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminTransactions.css";

const AdminTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchTransactions = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8080/api/admin/transactions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTransactions(response.data);

            } catch (err) {

                console.error(
                    "Failed to load transactions:",
                    err
                );

                setError(
                    "Failed to load transactions."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchTransactions();

    }, []);


    if (loading) {
        return (
            <div className="admin-transactions-loading">
                Loading transactions...
            </div>
        );
    }


    if (error) {
        return (
            <div className="admin-transactions-error">
                {error}
            </div>
        );
    }


    return (
        <div className="admin-transactions">

            <div className="transactions-header">

                <div>
                    <h1>Transactions</h1>

                    <p>
                        View all property payments and
                        transaction details.
                    </p>
                </div>

                <div className="transaction-count">
                    {transactions.length} Transactions
                </div>

            </div>


            {transactions.length === 0 ? (

                <div className="no-transactions">
                    No transactions found.
                </div>

            ) : (

                <div className="transactions-table-wrapper">

                    <table className="transactions-table">

                        <thead>

                            <tr>

                                <th>Property</th>

                                <th>Seller</th>

                                <th>Buyer</th>

                                <th>Amount</th>

                                <th>Payment</th>

                                <th>Property Status</th>

                                <th>Payment ID</th>

                                <th>Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {transactions.map(
                                (transaction) => (

                                <tr
                                    key={
                                        transaction.id
                                    }
                                >

                                    <td>

                                        <div className="property-cell">

                                            {transaction.propertyImage ? (

                                                <img
                                                    src={
                                                        transaction.propertyImage
                                                    }
                                                    alt={
                                                        transaction.propertyTitle
                                                    }
                                                />

                                            ) : (

                                                <div className="property-placeholder">
                                                    🏠
                                                </div>

                                            )}

                                            <span>
                                                {
                                                    transaction.propertyTitle
                                                }
                                            </span>

                                        </div>

                                    </td>


                                    <td>
                                        {
                                            transaction.sellerName
                                        }
                                    </td>


                                    <td>
                                        {
                                            transaction.buyerName
                                        }
                                    </td>


                                    <td className="amount">
                                        ₹
                                        {Number(
                                            transaction.amount
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>


                                    <td>

                                        <span
                                            className={`payment-status ${
                                                transaction.paymentStatus
                                                    ?.toLowerCase()
                                            }`}
                                        >
                                            {
                                                transaction.paymentStatus
                                            }
                                        </span>

                                    </td>


                                    <td>

                                        <span
                                            className={`property-status ${
                                                transaction.propertyStatus
                                                    ?.toLowerCase()
                                            }`}
                                        >
                                            {
                                                transaction.propertyStatus
                                            }
                                        </span>

                                    </td>


                                    <td className="payment-id">

                                        {
                                            transaction.paymentId ||
                                            "—"
                                        }

                                    </td>


                                    <td>

                                        {transaction.createdAt
                                            ? new Date(
                                                transaction.createdAt
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                            : "—"}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default AdminTransactions;