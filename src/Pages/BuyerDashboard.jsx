import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../css/BuyerDashboard.css";

function BuyerDashboard() {

    const navigate = useNavigate();

    const userName =
        localStorage.getItem("fullName") || "Buyer";

    return (
        <>
            <Navbar />

            <div className="buyer-dashboard">

                <div className="buyer-header">
                    <h1>Welcome, {userName} 👋</h1>
                    <p>
                        Find your ideal residential property
                    </p>
                </div>

                <div className="buyer-actions">

                    <div
                        className="buyer-card"
                        onClick={() => navigate("/")}
                    >
                        <h2>🏠</h2>
                        <h3>Browse Properties</h3>
                        <p>
                            Explore available residential properties.
                        </p>
                    </div>

                    <div
                        className="buyer-card"
                        onClick={() => navigate("/wishlist")}
                    >
                        <h2>❤️</h2>
                        <h3>Wishlist</h3>
                        <p>
                            View your saved properties.
                        </p>
                    </div>

                    <div
                        className="buyer-card"
                        onClick={() => navigate("/my-payments")}
                    >
                        <h2>💳</h2>
                        <h3>My Payments</h3>
                        <p>
                            Track your platform payments.
                        </p>
                    </div>

                    <div
                        className="buyer-card"
                        onClick={() => navigate("/my-visits")}
                    >
                        <h2>📅</h2>
                        <h3>My Visits</h3>
                        <p>
                            Track your property visit requests.
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default BuyerDashboard;