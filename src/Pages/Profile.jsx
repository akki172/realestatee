import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import BuyerPreferences from "./BuyerPreferences";
import "../css/Profile.css";

import {
    getProfile,
    updateProfile
} from "../services/ProfileService";


function Profile() {

    const navigate = useNavigate();

    const userId = Number(
        localStorage.getItem("userId")
    );


    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        verified: false
    });


    const [isEditing, setIsEditing] =
        useState(false);

    const [isLoading, setIsLoading] =
        useState(true);

    const [isSaving, setIsSaving] =
        useState(false);

    const [success, setSuccess] =
        useState("");

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            if (!userId) {

                navigate("/login");

                return;
            }


            setIsLoading(true);

            const response =
                await getProfile(userId);

            setProfile(response.data);

        } catch (err) {

            console.error(
                "Error loading profile:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to load profile."
            );

        } finally {

            setIsLoading(false);

        }
    };


    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };


    const handleSave = async () => {

        setSuccess("");
        setError("");


        if (!profile.fullName.trim()) {

            setError(
                "Full name cannot be empty."
            );

            return;
        }


        if (!profile.phone.trim()) {

            setError(
                "Phone number cannot be empty."
            );

            return;
        }


        try {

            setIsSaving(true);

            await updateProfile(
                userId,
                {
                    fullName:
                        profile.fullName.trim(),

                    phone:
                        profile.phone.trim()
                }
            );


            setSuccess(
                "Profile updated successfully."
            );

            setIsEditing(false);


            // Refresh profile
            await loadProfile();


        } catch (err) {

            console.error(
                "Profile update error:",
                err
            );

            setError(
                err.response?.data ||
                "Failed to update profile."
            );

        } finally {

            setIsSaving(false);

        }
    };


    const handleCancel = () => {

        setIsEditing(false);

        setError("");
        setSuccess("");

        // Reload original data
        loadProfile();

    };


    const initials = profile.fullName
        ? profile.fullName
            .split(" ")
            .filter(Boolean)
            .map((name) => name[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";


    if (isLoading) {

        return (

            <>
                <Navbar />

                <div className="profile-loading">

                    Loading profile...

                </div>

            </>

        );

    }


    return (

        <>

            <Navbar />


            <div className="profile-page">

                {/* =========================
                    PAGE HEADER
                ========================= */}

                <div className="profile-page-header">

                    <button
                        className="profile-back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </button>


                    <p className="profile-eyebrow">
                        ACCOUNT
                    </p>

                    <h1 className="profile-title">
                        My Profile
                    </h1>

                    <p className="profile-subtitle">
                        Manage your account information
                        and property preferences.
                    </p>

                </div>


                {/* =========================
                    ACCOUNT CARD
                ========================= */}

                <div className="profile-container">

                    <div className="profile-top">

                        <div className="profile-avatar">
                            {initials}
                        </div>


                        <div className="profile-user-info">

                            <h2>
                                {profile.fullName ||
                                    "Your Name"}
                            </h2>

                            <span>
                                {profile.role ||
                                    "USER"}
                            </span>

                        </div>

                    </div>


                    <div className="profile-divider" />


                    <div className="profile-section-title">
                        Personal Information
                    </div>


                    {/* FULL NAME */}

                    <div className="profile-field">

                        <label>
                            Full Name
                        </label>

                        {isEditing ? (

                            <input
                                name="fullName"
                                value={
                                    profile.fullName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Your full name"
                            />

                        ) : (

                            <div className="profile-value">
                                {profile.fullName ||
                                    "Not provided"}
                            </div>

                        )}

                    </div>


                    {/* EMAIL */}

                    <div className="profile-field">

                        <label>
                            Email
                        </label>

                        <div className="profile-value profile-readonly">

                            {profile.email ||
                                "Not available"}

                            <span>
                                🔒
                            </span>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="profile-field">

                        <label>
                            Phone
                        </label>

                        {isEditing ? (

                            <input
                                name="phone"
                                value={
                                    profile.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Your phone number"
                            />

                        ) : (

                            <div className="profile-value">
                                {profile.phone ||
                                    "Not provided"}
                            </div>

                        )}

                    </div>


                    {/* ROLE */}

                    <div className="profile-field">

                        <label>
                            Role
                        </label>

                        <div className="profile-value profile-readonly">

                            {profile.role ||
                                "USER"}

                            <span>
                                🔒
                            </span>

                        </div>

                    </div>


                    {/* ACCOUNT STATUS */}

                    <div className="profile-field">

                        <label>
                            Account Status
                        </label>

                        <div
                            className={
                                profile.verified
                                    ? "profile-status verified-yes"
                                    : "profile-status verified-no"
                            }
                        >

                            {profile.verified
                                ? "✓ Verified"
                                : "✗ Not Verified"}

                        </div>

                    </div>


                    {/* MESSAGES */}

                    {error && (

                        <p className="profile-error">
                            {error}
                        </p>

                    )}


                    {success && (

                        <p className="profile-success">
                            {success}
                        </p>

                    )}


                    {/* ACTIONS */}

                    {!isEditing ? (

                        <button
                            className="profile-edit-btn"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            Edit Profile
                        </button>

                    ) : (

                        <div className="profile-actions">

                            <button
                                className="profile-cancel-btn"
                                onClick={
                                    handleCancel
                                }
                                disabled={isSaving}
                            >
                                Cancel
                            </button>


                            <button
                                className="profile-save-btn"
                                onClick={handleSave}
                                disabled={isSaving}
                            >

                                {isSaving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    )}

                </div>


                {/* =========================
                    PROPERTY PREFERENCES
                ========================= */}

                <div className="profile-preferences-wrapper">

                    <div className="profile-preferences-heading">

                        <p className="profile-eyebrow">
                            PROPERTY SEARCH
                        </p>

                        <h2>
                            Property Preferences
                        </h2>

                        <p>
                            Tell us what type of
                            property you are looking for.
                        </p>

                    </div>


                    <BuyerPreferences />

                </div>

            </div>

        </>

    );
}


export default Profile;