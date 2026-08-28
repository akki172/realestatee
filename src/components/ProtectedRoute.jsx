import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    // User not logged in
    if (isLoggedIn !== "true") {
        return <Navigate to="/login" replace />;
    }

    // User logged in but role not allowed
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
   

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

}

export default ProtectedRoute;