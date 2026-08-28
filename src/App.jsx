import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================================
// AUTHENTICATION
// =========================================

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import ResetPassword from "./Pages/RestPassword";
import ForgetPassword from "./Pages/ForgotPassword";
import Calculator from "./Pages/Calculator";

// =========================================
// BUYER
// =========================================

import PropertyDetails from "./Pages/PropertyDetails";
import PropertyList from "./Pages/PropertyList";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import ScheduleVisit from "./Pages/ScheduleVisit";


// =========================================
// SELLER
// =========================================

import SellerDashboard from "./Pages/SellerDashboard";
import AddProperty from "./Pages/AddProperty";
import MyProperties from "./Pages/Myproperties";
import EditProperty from "./Pages/EditProperty";
import SellerVisits from "./Pages/SellerVisits";
import SellerAnalytics from "./Pages/SellerAnalytics";
import SellerProfile from "./Pages/SellerProfile";


// =========================================
// ADMIN
// =========================================

import AdminDashboard from "./Pages/Admindashboard";
import AdminUsers from "./Pages/AdminUsers";
import AdminProperties from "./Pages/AdminProperties";
import AdminUserDetails from "./Pages/AdminUserDetails";

import PaymentPage from "./Pages/PaymentPage";
import PaymentResult from "./Pages/PaymentResult";
import PaymentHistory from "./Pages/PaymentHistory";
import PaymentReceipt from "./Pages/PaymentRecipt";
import SellerBookings from "./Pages/SellerBooking";
import AdminTransactions from "./Pages/AdminTransactions";
import AdminAnalytics from "./Pages/AdminAnalytics";



function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =================================
                    PUBLIC ROUTES
                ================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />
                
                <Route
    path="/seller/bookings"
    element={<SellerBookings />}
/>
                <Route
    path="/payment/result"
    element={
        <ProtectedRoute>
            <PaymentResult />
        </ProtectedRoute>
    }
/>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgetPassword />}
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />


                {/* =================================
                    PROPERTY
                ================================= */}

                <Route
                    path="/property-list"
                    element={<PropertyList />}
                />


                <Route
    path="/admin/analytics"
    element={<AdminAnalytics />}
/>

                <Route
                    path="/property/:id"
                    element={<PropertyDetails />}
                />


                {/* =================================
                    BUYER
                ================================= */}

                <Route
                    path="/schedule-visit"
                    element={<ScheduleVisit />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =================================
                    SELLER
                ================================= */}

                <Route
                    path="/seller/dashboard"
                    element={
                        <ProtectedRoute>
                            <SellerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/seller/add-property"
                    element={<AddProperty />}
                />

                <Route
                    path="/seller/properties"
                    element={<MyProperties />}
                />

                <Route
                    path="/seller/analytics"
                    element={<SellerAnalytics />}
                />

                <Route
                    path="/seller/visits"
                    element={
                        <ProtectedRoute>
                            <SellerVisits />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/seller/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditProperty />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/seller-profile/:sellerId"
                    element={<SellerProfile />}
                />

                 <Route
    path="/calculator"
    element={<Calculator />}
/>
                {/* =================================
                    ADMIN
                ================================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/admin/transactions"
    element={<AdminTransactions />}
/>

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <AdminUsers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users/:id"
                    element={
                        <ProtectedRoute>
                            <AdminUserDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/properties"
                    element={
                        <ProtectedRoute>
                            <AdminProperties />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/payment/receipt/:paymentId"
    element={
        <ProtectedRoute>
            <PaymentReceipt />
        </ProtectedRoute>
    }
/>
               <Route
    path="/payment"
    element={
        <ProtectedRoute>
            <PaymentPage />
        </ProtectedRoute>
    }
/>
<Route
    path="/payment-history"
    element={<PaymentHistory />}
/>
            </Routes>

        </BrowserRouter>

    );

}

export default App;